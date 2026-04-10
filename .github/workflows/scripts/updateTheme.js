const fs = require('fs');
const path = require('path');

// Validate required environment variables
if (!process.env['ZENDESK_SUBDOMAIN'] || !process.env['ZENDESK_EMAIL'] || !process.env['ZENDESK_TOKEN'] || !process.env['THEME_ID']) {
    console.error('Missing required environment variables: ZENDESK_SUBDOMAIN, ZENDESK_EMAIL, ZENDESK_TOKEN, THEME_ID');
    process.exit(1);
}

const authValue = Buffer.from(`${process.env['ZENDESK_EMAIL']}/token:${process.env['ZENDESK_TOKEN']}`).toString('base64');
const baseURL = `https://${process.env['ZENDESK_SUBDOMAIN']}.zendesk.com/api/v2`;
const themeId = process.env['THEME_ID'];
const filePath = path.join(__dirname, 'theme.zip');
const replaceSettings = true;
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

async function updateTheme(themeId, replaceSettings) {
    try {
        const data = await zendeskFetch('/guide/theming/jobs/themes/updates', {
            method: 'POST',
            body: JSON.stringify({
                job: {
                    attributes: {
                        theme_id: themeId,
                        replace_settings: replaceSettings,
                        format: "zip"
                    }
                }
            }),
        });

        const safeData = {
            job: {
                id: data.job.id,
                status: data.job.status,
                upload_url: data.job.data.upload.url,
                upload_parameters: '[REDACTED]'
            }
        };
        console.log('::group::Update Theme Response');
        const prettyResponse = JSON.stringify(safeData, null, 2);
        console.log(prettyResponse);
        console.log('::endgroup::');
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Update Theme Response\n\`\`\`json\n${prettyResponse}\n\`\`\``);

        return {
            jobId: data.job.id,
            uploadUrl: data.job.data.upload.url,
            uploadParameters: data.job.data.upload.parameters
        };
    } catch (error) {
        console.log('::group::Action failed with error');
        console.log(error.message);
        console.log('::endgroup::');
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Update Theme Error\n\`\`\`\n${error.message}\n\`\`\``);
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

async function checkUpdateJobStatus(jobId) {
    try {
        const data = await zendeskFetch(`/guide/theming/jobs/${jobId}`, { method: 'GET' });

        if (data.job.status !== 'pending') {
            console.log('::group::Check Update Job Status Response');
            const prettyResponse = JSON.stringify(data, null, 2);
            console.log(prettyResponse);
            console.log('::endgroup::');
            fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Check Update Job Status Response\n\`\`\`json\n${prettyResponse}\n\`\`\``);
        }
        return data.job;
    } catch (error) {
        console.log('::group::Action failed with error');
        console.log(error.message);
        console.log('::endgroup::');
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Check Update Job Status Error\n\`\`\`\n${error.message}\n\`\`\``);
        process.exit(1);
    }
}

async function run() {
    try {
        const { jobId, uploadUrl, uploadParameters } = await updateTheme(themeId, replaceSettings);
        console.log('Job ID:', jobId);

        console.log('Uploading theme file...');
        await uploadThemeFile(uploadUrl, uploadParameters, filePath);
        console.log('Theme file uploaded.');

        let jobStatus = await checkUpdateJobStatus(jobId);
        const startTime = Date.now();
        let attemptInterval = 5000;

        while (jobStatus.status !== 'completed' && jobStatus.status !== 'failed') {
            if (Date.now() - startTime > MAX_WAIT_TIME) {
                console.error('Job status check timed out');
                fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Job Status Check Timeout\nJob did not complete within ${MAX_WAIT_TIME / 1000} seconds`);
                break;
            }
            console.log('Waiting for job to complete...');
            await new Promise(resolve => setTimeout(resolve, attemptInterval));

            jobStatus = await checkUpdateJobStatus(jobId);
            attemptInterval = Math.min(attemptInterval * 1.5, 60000);
        }

        if (jobStatus.status === 'failed') {
            console.error('Job failed:', JSON.stringify(jobStatus.errors, null, 2));
            fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Job Failed\n\`\`\`json\n${JSON.stringify(jobStatus.errors, null, 2)}\n\`\`\``);
            process.exit(1);
        } else if (jobStatus.status === 'completed') {
            console.log('Job completed. Theme updated.');
        } else {
            console.error('Job in unexpected state:', jobStatus.status);
            fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\n## Unexpected Job State\n\`\`\`json\n${jobStatus.status}\n\`\`\``);
            process.exit(1);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        process.exit(1);
    }
}

run();
