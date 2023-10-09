/**
 * Reads account information from env variables or .a11yrc.json file
 */
const fs = require("fs");

let a11yAccount = {};
const a11yrcFilePath = ".a11yrc.json";

if (fs.existsSync(a11yrcFilePath)) {
  a11yAccount = JSON.parse(fs.readFileSync(a11yrcFilePath));
}

function isValid(account) {
  return account.subdomain && account.email && account.password;
}

function getAccount() {
  // Reads account from the env or .a11yrc.json file if present
  let account = {
    subdomain: process.env.subdomain || a11yAccount.subdomain,
    email: process.env.end_user_email || a11yAccount.username,
    password: process.env.end_user_password || a11yAccount.password,
    urls: process.env?.urls?.trim()?.split(/\s+/) || a11yAccount.urls
  };

  if (!isValid(account)) {
    console.error(
      "No account specified. Please create a .a11yrc.json file or set subdomain, end_user_email and end_user_password as environment variables"
    );
    process.exit(1);
  }

  return account;
}

module.exports = getAccount;
