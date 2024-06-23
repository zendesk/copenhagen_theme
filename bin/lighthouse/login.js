async function login(browser, account) {
  const { email, password, loginUrl } = account;

  const ua =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";

  const page = await browser.newPage();
  await page.setUserAgent(ua);
  await page.goto(loginUrl);
  console.log("Login page loaded, attempting to log in...");
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
