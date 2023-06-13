async function login(browser, account) {
  const { email, password, loginUrl } = account;
  
  const page = await browser.newPage();
  await page.goto(loginUrl);
  await page.waitForSelector("input#user_email", { visible: true });
  await page.type("input#user_email", email);
  await page.type("input#user_password", password);
  await Promise.all([
    page.click("#sign-in-submit-button"),
    page.waitForNavigation(),
  ]);
  await page.close();
}

module.exports = login;
