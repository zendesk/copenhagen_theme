
module.exports = async (browser, context) => {
    const page = await browser.newPage();
    await page.goto('https://' + process.env.subdomain + '.zendesk.com/auth/v2/login');
    await page.type('#user_email', process.env.end_user_email);
    await page.type('#user_password', process.env.end_user_password);
    const navigationPromise = page.waitForNavigation();
    await page.click('[name="commit"]');
    await navigationPromise;
};
