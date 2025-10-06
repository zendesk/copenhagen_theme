async function login(browser, account) {
  const { email, password, loginUrl } = account;

  const page = await browser.newPage();
  await page.goto(loginUrl);
  await page.waitForSelector('input[type="email"]', { visible: true });
  await page.type('input[type="email"]', email);
  await page.type('input[type="password"]', password);
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation(),
  ]);
  await page.close();
}

module.exports = login;
