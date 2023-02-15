/**
 * Reads account information from env variables or .zat file
 */
const zatAccount = require("./zat");

function isValid(account) {
  return account.subdomain && account.email && account.password;
}

function getAccount() {
  // Reads account from the env or .zat file if present
  let account = {
    subdomain: process.env.subdomain || zatAccount.subdomain,
    email: process.env.end_user_email || zatAccount.username,
    password: process.env.end_user_password || zatAccount.password,
    urls: process.env?.urls?.trim()?.split(/\s+/) || zatAccount.urls
  };

  if (!isValid(account)) {
    console.error(
      "No account specified. Please create a .zat file or set subdomain, end_user_email and end_user_password as environment variables"
    );
    process.exit(1);
  }

  return account;
}

module.exports = getAccount;
