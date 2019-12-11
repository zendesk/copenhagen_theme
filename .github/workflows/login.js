/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async (browser, context) => {
    const page = await browser.newPage();
    await page.goto(`https://${process.env.subdomain}.zendesk.com/hc/en-us/signin`);
    const frames = await page.frames();
    await frames[1].type('#user_email', process.env.zendesk_email);
    await frames[1].type('#user_password', process.env.zendesk_password);
    await frames[1].click('[name="commit"]');
    await page.waitForNavigation();
};
