const ConnectionString = require('connection-string').ConnectionString;
const config = require('dotenv').config;
const path = require('path');
const fs = require('fs');
const nestCliConfig = JSON.parse(fs.readFileSync('.nestcli.json'));
config();

const connectionString = new ConnectionString(process.env.DATABASE_URL);
const libs = Object.keys(nestCliConfig.projects).filter(key => nestCliConfig.projects[key].projectType === 'library').map(key => nestCliConfig.projects[key]);
const apps = Object.keys(nestCliConfig.projects).filter(key => nestCliConfig.projects[key].projectType === 'application').map(key => nestCliConfig.projects[key]);
const defaultProject = nestCliConfig.defaultProject;
const defaultApp = nestCliConfig.projects[defaultProject];

if (connectionString.protocol === 'sqlite') {
    module.exports = {
        type: 'sqlite',
        database: './' + connectionString.hosts[0].name + (connectionString.path.length ? '/' + connectionString.path[0] : ''),
        entities: libs.map(lib => `${lib.sourceRoot}/**/entities/**/*.entity.ts`),
        migrations: libs.map(lib => `${lib.sourceRoot}/**/migrations/**/*.ts`),
        subscribers: libs.map(lib => `${lib.sourceRoot}/**/subscribers/**/*.ts`),
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: `${defaultApp.sourceRoot}/migrations`
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
        entities: libs.map(lib => `${lib.sourceRoot}/**/entities/**/*.entity.ts`),
        migrations: libs.map(lib => `${lib.sourceRoot}/**/migrations/**/*.ts`),
        subscribers: libs.map(lib => `${lib.sourceRoot}/**/subscribers/**/*.ts`),
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: `${defaultApp.sourceRoot}/migrations`
        }
    }
}