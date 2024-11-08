const { writeFileSync, mkdirSync } = require("fs");

require("dotenv").config();

const targetPathProd = "./src/environments/environment.ts";
const targetPathDev = "./src/environments/environment.development.ts";

const envProdFileContent = `export const environment = {
  production: true,
  githubApiBaseUrl: '${process.env["GITHUB_API_BASE_URL"]}',
  githubToken:
    '${process.env["GITHUB_TOKEN"]}',
};
`;

const envDevFileContent = `export const environment = {
  production: false,
  githubApiBaseUrl: '${process.env["GITHUB_API_BASE_URL"]}',
  githubToken:
    '${process.env["GITHUB_TOKEN"]}',
};
`;

mkdirSync("./src/environments", { recursive: true });
writeFileSync(targetPathDev, envDevFileContent);
writeFileSync(targetPathProd, envProdFileContent);
