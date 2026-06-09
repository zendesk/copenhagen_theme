const fs = require('fs');

const brandId = process.argv[2];
const filePath = process.argv[3];

if (!brandId || !filePath) {
    console.log('Please provide a brandId and a file path as arguments.');
    process.exit(1);
}

if (!process.env['ZENDESK_SUBDOMAIN'] || !process.env['ZENDESK_EMAIL'] || !process.env['ZENDESK_TOKEN']) {
    console.error('Missing required environment variables: ZENDESK_SUBDOMAIN, ZENDESK_EMAIL, ZENDESK_TOKEN');
    process.exit(1);
}

const authValue = Buffer.from(`${process.env['ZENDESK_EMAIL']}/token:${process.env['ZENDESK_TOKEN']}`).toString('base64');
const baseURL = `https://${process.env['ZENDESK_SUBDOMAIN']}.zendesk.com/api/v2`;
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
            body: JSON.stringify({ job: { attributes: { brand_id: brandId, format: 'zip' } } }),
        });
        console.log('::group::Import Theme Response');
        console.log(JSON.stringify(data, null, 2));
        console.log('::endgroup::');
        return {
            jobId: data.job.id,
            uploadUrl: data.job.data.upload.url,
            uploadParameters: data.job.data.upload.parameters,
            themeId: data.job.data.theme_id,
        };
    } catch (error) {
        console.log('::group::Action failed with error');
        console.log(error.message);
        console.log('::endgroup::');
        process.exit(1);
    }
}

async function uploadThemeFile(uploadUrl, uploadParameters, filePath) {
    const form = new FormData();
    for (const key in uploadParameters) {
        form.append(key, uploadParameters[key]);
    }
    const blob = new Blob([fs.readFileSync(filePath)]);
    form.append('file', blob, 'theme.zip');

    try {
        const response = await fetch(uploadUrl, { method: 'POST', body: form });
        const text = await response.text();
        console.log('::group::Upload Theme File Response');
        console.log(text);
        console.log('::endgroup::');
        if (!response.ok) throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    } catch (error) {
        console.log('::group::Action failed with error');
        console.log(error.message);
        console.log('::endgroup::');
        process.exit(1);
    }
}

async function checkImportJobStatus(jobId) {
    try {
        const data = await zendeskFetch(`/guide/theming/jobs/${jobId}`, { method: 'GET' });
        if (data.job.status !== 'pending') {
            console.log('::group::Import Job Response');
            console.log(JSON.stringify(data, null, 2));
            console.log('::endgroup::');
        }
        return data.job;
    } catch (error) {
        console.log('::group::Action failed with error');
        console.log(error.message);
        console.log('::endgroup::');
        process.exit(1);
    }
}

async function run() {
    const { jobId, uploadUrl, uploadParameters, themeId } = await importTheme(brandId);
    console.log('Job ID:', jobId);
    console.log('Theme ID:', themeId);

    console.log('Uploading theme file...');
    await uploadThemeFile(uploadUrl, uploadParameters, filePath);
    console.log('Theme file uploaded.');

    let jobStatus = await checkImportJobStatus(jobId);
    const startTime = Date.now();
    while (jobStatus.status !== 'completed' && jobStatus.status !== 'failed') {
        if (Date.now() - startTime > MAX_WAIT_TIME) {
            console.error('Job status check timed out');
            process.exit(1);
        }
        console.log('Waiting for job to complete...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        jobStatus = await checkImportJobStatus(jobId);
    }

    if (jobStatus.status === 'failed') {
        console.error('Job failed:', JSON.stringify(jobStatus.errors, null, 2));
        process.exit(1);
    }

    console.log('Job completed. Theme imported. Theme ID:', themeId);
}

run();