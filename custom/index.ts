import fs from 'fs-extra';
import merge from 'lodash/merge';
import path from 'path';

function log(...args: any[]) {
    console.log('[plugin-common-config:custom]', ...args);
}

const pkg = readJsonFile(`${process.cwd()}/package.json`);
export function initSiteCustom(startArgs: Record<string, string>) {
    if (!startArgs.custom) return;
    const configDir = path.join(__dirname, startArgs.custom, pkg.shortname);
    if (!fs.existsSync(configDir)) {
        log(`Custom "${configDir}" is not found!`);
        return;
    }
    log('Init custom >>>>>', startArgs.custom);
    mergeEnv(configDir);
    copyResource(configDir);
    applySettings(configDir);
}

function mergeEnv(rootDir: string) {
    const dir = path.join(rootDir, 'env');
    if (!fs.existsSync(dir)) return;
    ['base', 'dev', 'prod', 'test'].forEach((env) => {
        const envFile = path.join(dir, env + '.json');
        if (!fs.existsSync(envFile)) return;
        log('Found env file:', envFile);
        const cusEnv = readJsonFile(envFile);
        const sourceEnvPath = path.join(process.cwd(), 'config/env', env + '.json');
        const sourceEnv = fs.existsSync(sourceEnvPath) ? readJsonFile(sourceEnvPath) : {};
        const mergedEnv = merge(sourceEnv, cusEnv);
        fs.writeFileSync(sourceEnvPath, JSON.stringify(mergedEnv, null, 2));
        log(`${env} merged`);
    });
}
function copyResource(rootDir: string) {
    const dirs = {
        public: 'public',
        assets: 'src/assets',
    };
    Object.keys(dirs).forEach((key) => {
        const src = key,
            to = dirs[key];
        const srcPath = path.join(rootDir, src);
        if (!fs.existsSync(srcPath)) return;
        const outDir = path.join(process.cwd(), to);
        fs.copySync(srcPath, outDir, {
            overwrite: true,
        });
        log('Resource copied', outDir);
    });
}

function applySettings(rootDir: string) {
    const configDir = path.join(rootDir, 'settings.ts');
    if (!fs.existsSync(configDir)) return;
    const sourceFile = path.join(process.cwd(), 'config/defaultSettings.ts');
    const fileContent = fs.readFileSync(sourceFile, 'utf8');
    const customConfig = require(configDir).default;
    const newCode = fileContent.replace(
        /\$SiteCustom\s?=\s?\{\s?}/,
        `$SiteCustom=${JSON.stringify(customConfig, null, 2)}`,
    );
    console.log(newCode);
    fs.writeFileSync(sourceFile, newCode, 'utf8');
    log('Settings has been updated with new properties.');
}

function readJsonFile(path: string): Record<string, any> {
    const content = fs.readFileSync(path, 'utf-8');
    return JSON.parse(content);
}
