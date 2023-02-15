require("dotenv").config();
const lighthouse = require("lighthouse/core/index.cjs");
const puppeteer = require("puppeteer");
const config = require("./config");
const getAccount = require("./account");
const buildUrlsFromAPI = require("./urls");
const login = require("./login");
const processResults = require("./processor");
const { ERROR, WARNING } = require("./constants");

const outputAudit = (
  { title, description, url, id, selector, snippet, explanation },
  emoji
) => {
  console.log("");  
  console.log(`${emoji} ${id}: ${title}`);
  console.log(description, "\n");
  console.log({ url, selector, snippet }, "\n");
  console.log(explanation, "\n");
}

(async () => {
  // TODO: If dev, check if ZAT is running
  const isDev = process.argv[2] === "-d";
  const results = {
    stats: {},
    audits: [],
  };

  // Reading account
  console.log("Reading account...", "\n");
  const account = getAccount();

  // Build list of urls to audit
  if (!account.urls || account.urls.length === 0) {
    console.log(
      "No urls were found in .zat or as env variable. Building urls from the API...",
      "\n"
    );
    account.urls = await buildUrlsFromAPI(account);
  }

  // Set login URL
  account.loginUrl = isDev
    ? `https://${account.subdomain}.zendesk.com/hc/admin/local_preview/start`
    : `https://${account.subdomain}.zendesk.com/hc/en-us/signin`;

  // Output account
  console.log("Account:");
  console.log(
    {
      subdomain: account.subdomain,
      email: account.email,
      urls: account.urls,
      loginUrl: account.loginUrl,
    },
    "\n"
  );

  // Use Puppeteer to launch headless Chrome
  console.log("Starting headless Chrome...");
  const browser = await puppeteer.launch({ headless: true });

  // Login
  console.log(`Logging in using ${account.loginUrl}...`, "\n");
  await login(browser, account);

  // Run lighthouse on all pages
  for (let url of account.urls) {
    console.log(`Running lighthouse in ${url}`);

    const page = await browser.newPage();
    
    const { lhr } = await lighthouse(
      url,
      { port: new URL(browser.wsEndpoint()).port, logLevel: "silent" },
      config.lighthouse,
      page
    );

    // Output run warnings
    lhr.runWarnings.forEach((message) => console.warn(message));

    // Analyze / process results
    const { stats, audits } = processResults(lhr);
    results.stats[url] = stats;
    results.audits = [...results.audits, ...audits];

    console.log("");
  }

  // Close browser
  await browser.close();

  // Output table with stats for each url
  console.table(results.stats);

  // Output warnings
  const warnings = results.audits.filter((audit) => audit.result === WARNING);
  warnings.forEach((audit) => outputAudit(audit, "⚠️"));

  // Output errors
  const errors = results.audits.filter((audit) => audit.result === ERROR);
  errors.forEach((audit) => outputAudit(audit, "❌"));

  // Output totals
  console.log(
    "\n",
    `Total of ${errors.length} errors and ${warnings.length} warnings`,
    "\n"
  );

  // Exit with error if there is at least one audit with an error
  if (errors.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
})();
