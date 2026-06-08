const fs = require('fs');
const path = require('path');

// Validate required environment variables
if (!process.env['ZENDESK_SUBDOMAIN'] || !process.env['ZENDESK_EMAIL'] || !process.env['ZENDESK_TOKEN'] || !process.env['BRAND_ID']) {
    console.error('Missing required environment variables: ZENDESK_SUBDOMAIN, ZENDESK_EMAIL, ZENDESK_TOKEN, BRAND_ID');
    process.exit(1);
}

const authValue = Buffer.from(`${process.env['ZENDESK_EMAIL']}/token:${process.env['ZENDESK_TOKEN']}`).toString('base64');
const baseURL = `https://${process.env['ZENDESK_SUBDOMAIN']}.zendesk.com/api/v2`;
const brandId = process.env['BRAND_ID'];
const filePath = path.join(__dirname, 'theme.zip');
const MAX_WAIT_TIME = 5 * 60 * 1000;

async function zendeskFetch(endpoint, options = {}) {
    const url = `${baseURL}${endpoint}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${authValue}`,
            ...options.headers,
        },
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`${response.status} ${response.statusText}: ${text}`);
    }
    return response.json();
}

async function importTheme(brandId) {
    try {
        const data = await zendeskFetch('/guide/theming/jobs/themes/imports', {
            method: 'POST',
            body: JSON.stringify({
                job: {
                    attributes: {
                        brand_id: brandId,
                        format: "zip"
                    }
                }
            }),
        });

        const safeData = {
            job: {
                id: data.job.id,
                status: data.job.status,
                theme_id: data.job.data.theme_id,
                upload_url: data.job.data.upload.url,
                upload_parameters: '[REDACTED]'
            }
        };
        console.log('::group::Import Theme Response');
        const prettyResponse = JSON.stringify(safeData, null, 2);
        console.log(prettyResponse);
        console.log('::endgroup::');
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Import Theme Response\n\`\`\`json\n${prettyResponse}\n\`\`\``);

        return {
            jobId: data.job.id,
            themeId: data.job.data.theme_id,
            uploadUrl: data.job.data.upload.url,
            uploadParameters: data.job.data.upload.parameters
        };
    } catch (error) {
        console.log('::group::Action failed with error');
        console.log(error.message);
        console.log('::endgroup::');
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Import Theme Error\n\`\`\`\n${error.message}\n\`\`\``);
        process.exit(1);
    }
}

async function publishTheme(themeId) {
    try {
        const data = await zendeskFetch(`/guide/theming/themes/${themeId}/publish`, {
            method: 'PUT',
        });
        console.log('::group::Publish Theme Response');
        const prettyResponse = JSON.stringify(data, null, 2);
        console.log(prettyResponse);
        console.log('::endgroup::');
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Publish Theme Response\n\`\`\`json\n${prettyResponse}\n\`\`\``);
    } catch (error) {
        console.log('::group::Publish failed with error');
        console.log(error.message);
        console.log('::endgroup::');
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Publish Theme Error\n\`\`\`\n${error.message}\n\`\`\``);
        process.exit(1);
    }
}

async function uploadThemeFile(uploadUrl, uploadParameters, filePath) {
    const form = new FormData();

    for (const key in uploadParameters) {
        form.append(key, uploadParameters[key]);
    }

    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer]);
    form.append('file', blob, 'theme.zip');

    try {
        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: form,
        });

        const text = await response.text();
        console.log('::group::Upload Theme File Response');
        console.log(text);
        console.log('::endgroup::');
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Upload Theme File Response\n\`\`\`\n${text}\n\`\`\``);

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.log('::group::Action failed with error');
        console.log(error.message);
        console.log('::endgroup::');
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Upload Theme File Error\n\`\`\`\n${error.message}\n\`\`\``);
        process.exit(1);
    }
}

async function checkJobStatus(jobId) {
    try {
        const data = await zendeskFetch(`/guide/theming/jobs/${jobId}`, { method: 'GET' });

        if (data.job.status !== 'pending') {
            console.log('::group::Check Job Status Response');
            const prettyResponse = JSON.stringify(data, null, 2);
            console.log(prettyResponse);
            console.log('::endgroup::');
            fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Check Job Status Response\n\`\`\`json\n${prettyResponse}\n\`\`\``);
        }
        return data.job;
    } catch (error) {
        console.log('::group::Action failed with error');
        console.log(error.message);
        console.log('::endgroup::');
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Check Job Status Error\n\`\`\`\n${error.message}\n\`\`\``);
        process.exit(1);
    }
}

async function run() {
    try {
        const { jobId, themeId, uploadUrl, uploadParameters } = await importTheme(brandId);
        console.log('Job ID:', jobId);
        console.log('Theme ID:', themeId);
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## New Theme ID\n\`${themeId}\``);

        console.log('Uploading theme file...');
        await uploadThemeFile(uploadUrl, uploadParameters, filePath);
        console.log('Theme file uploaded.');

        let jobStatus = await checkJobStatus(jobId);
        const startTime = Date.now();
        let attemptInterval = 5000;

        while (jobStatus.status !== 'completed' && jobStatus.status !== 'failed') {
            if (Date.now() - startTime > MAX_WAIT_TIME) {
                console.error('Job status check timed out');
                fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Job Status Check Timeout\nJob did not complete within ${MAX_WAIT_TIME / 1000} seconds`);
                process.exit(1);
            }
            console.log('Waiting for import to complete...');
            await new Promise(resolve => setTimeout(resolve, attemptInterval));
            jobStatus = await checkJobStatus(jobId);
            attemptInterval = Math.min(attemptInterval * 1.5, 60000);
        }

        if (jobStatus.status === 'failed') {
            console.error('Import failed:', JSON.stringify(jobStatus.errors, null, 2));
            fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Import Failed\n\`\`\`json\n${JSON.stringify(jobStatus.errors, null, 2)}\n\`\`\``);
            process.exit(1);
        }

        console.log('Import completed. Publishing theme...');
        await publishTheme(themeId);
        console.log('Theme published.');
    } catch (error) {
        console.error('An error occurred:', error);
        process.exit(1);
    }
}

run();
