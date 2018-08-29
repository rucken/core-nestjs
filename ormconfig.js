const ConnectionString = require('connection-string').ConnectionString;
const load = require('dotenv').load;
const path = require('path');
const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV || 'develop';
// todo: wait resolve https://github.com/typeorm/typeorm/issues/2358
// const dbSourceExt = NODE_ENV === 'develop' ? 'ts' : 'js';
// const sourceRootKey = NODE_ENV === 'develop' ? 'sourceRoot' : 'outputPath';
const dbSourceExt = 'ts';
const sourceRootKey = 'sourceRoot';
const nestCliConfig = JSON.parse(fs.readFileSync('.nestcli.json'));
try {
    fs.accessSync(`${NODE_ENV}.env`);
    load({ path: `${NODE_ENV}.env` });
    console.log(`env file: ${NODE_ENV}.env`);
} catch (error) {
    console.log(`error on get env file: ${NODE_ENV}.env`);
    try {
        fs.accessSync(`.env`);
        load();
        console.log(`env file: .env`);
    } catch (error) {
        console.log(`error on get env file: .env`);
    }
}

const connectionString = new ConnectionString(process.env.DATABASE_URL);
const projects = Object.keys(nestCliConfig.projects).map(key => nestCliConfig.projects[key]);
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
        entities: [...libs, ...apps].map(lib => `${lib[sourceRootKey]}/**/entities/**/*.entity.${dbSourceExt}`),
        migrations: [...libs, ...apps].map(lib => `${lib[sourceRootKey]}/**/migrations/**/*.${dbSourceExt}`),
        subscribers: [...libs, ...apps].map(lib => `${lib[sourceRootKey]}/**/subscribers/**/*.${dbSourceExt}`),
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: `${defaultApp[sourceRootKey]}/migrations`
        }
    }
} else {
    module.exports = {
        type: connectionString.protocol,
        host: connectionString.hosts[0].name,
        port: +connectionString.hosts[0].port,
        username: connectionString.user,
        password: connectionString.password,
        database: connectionString.path[0],
        entities: [...libs, ...apps].map(lib => `${lib[sourceRootKey]}/**/entities/**/*.entity.${dbSourceExt}`),
        migrations: [...libs, ...apps].map(lib => `${lib[sourceRootKey]}/**/migrations/**/*.${dbSourceExt}`),
        subscribers: [...libs, ...apps].map(lib => `${lib[sourceRootKey]}/**/subscribers/**/*.${dbSourceExt}`),
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: `${defaultApp[sourceRootKey]}/migrations`
        }
    }
}