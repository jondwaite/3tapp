const { writeFile } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';

const targetPath = isProduction
    ? `./src/environments/environment.prod.ts`
    : `./src/environments/environment.ts`;

const environmentFileContent = `
export const environment = {
    production: ${isProduction},
    DB_HOSTNAME: "${process.env['DB_HOSTNAME']}",
    APP_HOSTNAME: "${process.env['APP_HOSTNAME']}",
    APP_IPADDR: "${process.env['APP_IPADDR']}",
    WEB_HOSTNAME: "${process.env['WEB_HOSTNAME']}",
    PROJECT: "${process.env['PROJECT']}",
    DEPLOYMENT: "${process.env['DEPLOYMENT']}",
    HOST: "${process.env['HOST']}",
    DEPLOY_AT: "${process.env['DEPLOY_AT']}",
    DEPLOY_BY: "${process.env['DEPLOY_BY']}",
    BLUEPRINT_ID: "${process.env['BLUEPRINT_ID']}",
    BLUEPRINT: "${process.env['BLUEPRINT']}",
    VERSION: "${process.env['VERSION']}"
};
`;

writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
        console.log(err);
    }
    console.log(`Wrote variables to ${targetPath}`);
});