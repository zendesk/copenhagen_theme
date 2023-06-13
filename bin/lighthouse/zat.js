/**
 * Reads account information from ".zat" file
 */

const fs = require("fs");

let zatAccount = {};
const zatFilePath = ".zat";

if (fs.existsSync(zatFilePath)) {
  zatAccount = JSON.parse(fs.readFileSync(zatFilePath));
}

module.exports = zatAccount;
