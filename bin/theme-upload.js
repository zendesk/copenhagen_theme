/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const brandId = process.env.BRAND_ID;
const { execSync } = require("child_process");

function zcli(command) {
  try {
    const data = execSync(`yarn zcli ${command} --json`);
    return JSON.parse(data.toString());
  } catch (e) {
    console.error(e.message);
    console.error(e.stdout.toString());
    process.exit(1);
  }
}

const { themeId } = zcli(`themes:import --brandId=${brandId}`);

zcli(`themes:publish --themeId=${themeId}`);

const { themes } = zcli(`themes:list --brandId=${brandId}`);

for (const { live, id } of themes) {
  if (!live) zcli(`themes:delete --themeId=${id}`);
}
