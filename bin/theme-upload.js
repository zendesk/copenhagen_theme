/* eslint-env node */
const brandId = process.env.BRAND_ID;
const { execSync } = require("child_process");

function zcli(command) {
  const data = execSync(`yarn --silent zcli ${command} --json`);
  return JSON.parse(data.toString());
}

const { themeId } = zcli(`themes:import --brandId=${brandId}`);

zcli(`themes:publish --themeId=${themeId}`);

const { themes } = zcli(`themes:list --brandId=${brandId}`);

for (const { live, id } of themes) {
  if (!live) zcli(`themes:delete --themeId=${id}`);
}
