const ConnectionString = require('connection-string').ConnectionString;
const config = require('dotenv').config;
const path = require('path');
const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV;
const dbSourceExt = process.env.NODE_ENV === 'develop' ? 'ts' : 'js';
const nestCliConfig = JSON.parse(fs.readFileSync('.nestcli.json'));
let sourceRootKey;

try {
    accessSync(`${NODE_ENV}.env`);
    config({ path: `${NODE_ENV}.env` });
    console.log(`env file: ${NODE_ENV}.env`, 'Main');
} catch (error) {
    try {
        accessSync(`.env`);
        config();
        console.log(`env file: .env`, 'Main');
    } catch (error) { }
}

if (dbSourceExt === 'ts') {
    sourceRootKey = 'sourceRoot';
} else {
    sourceRootKey = 'outputPath';
}

const connectionString = new ConnectionString(process.env.DATABASE_URL);
const libs = Object.keys(nestCliConfig.projects).filter(key => nestCliConfig.projects[key].projectType === 'library').map(key => nestCliConfig.projects[key]);
const apps = Object.keys(nestCliConfig.projects).filter(key => nestCliConfig.projects[key].projectType === 'application').map(key => nestCliConfig.projects[key]);
const defaultProject = nestCliConfig.defaultProject;
const defaultApp = nestCliConfig.projects[defaultProject];

if (connectionString.protocol === 'sqlite') {
    const databaseUrl =
        (dbSourceExt === 'ts' ? './' : '../') +
        connectionString.hosts[0].name +
        (connectionString.path.length ? '/' + connectionString.path[0] : '');
    module.exports = {
        type: 'sqlite',
        database: databaseUrl,
        entities: libs.map(lib => `${lib[sourceRootKey]}/**/entities/**/*.entity.${dbSourceExt}`),
        migrations: libs.map(lib => `${lib[sourceRootKey]}/**/migrations/**/*.${dbSourceExt}`),
        subscribers: libs.map(lib => `${lib[sourceRootKey]}/**/subscribers/**/*.${dbSourceExt}`),
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: `${defaultApp[sourceRootKey]}/migrations`
        }
    }
} else {
    module.exports = {
        type: connectionString.protocol,
        host: connectionString.host,
        port: +connectionString.port,
        username: connectionString.user,
        password: connectionString.password,
        database: connectionString.segments[0],
        entities: libs.map(lib => `${lib[sourceRootKey]}/**/entities/**/*.entity.${dbSourceExt}`),
        migrations: libs.map(lib => `${lib[sourceRootKey]}/**/migrations/**/*.${dbSourceExt}`),
        subscribers: libs.map(lib => `${lib[sourceRootKey]}/**/subscribers/**/*.${dbSourceExt}`),
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: `${defaultApp[sourceRootKey]}/migrations`
        }
    }
}