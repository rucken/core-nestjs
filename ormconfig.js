const ConnectionString = require('connection-string');
const load = require('dotenv').load;
const path = require('path');
const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV || 'develop';
const DB_SOURCE_EXT = process.env.DB_SOURCE_EXT || (NODE_ENV === 'develop' ? 'ts' : 'js');
// todo: wait resolve https://github.com/typeorm/typeorm/issues/2358
const sourceRootKey = (DB_SOURCE_EXT === 'ts' || NODE_ENV === 'develop') ? 'sourceRoot' : 'outputPath';
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

const connectionString = new ConnectionString(process.env.DATABASE_URL || '');
const projects = Object.keys(nestCliConfig.projects).map(key => nestCliConfig.projects[key]);
const libs = Object.keys(nestCliConfig.projects).filter(key => nestCliConfig.projects[key].projectType === 'library').map(key => nestCliConfig.projects[key]);
const apps = Object.keys(nestCliConfig.projects).filter(key => nestCliConfig.projects[key].projectType === 'application').map(key => nestCliConfig.projects[key]);
const defaultProject = nestCliConfig.defaultProject;
const defaultApp = nestCliConfig.projects[defaultProject];

if (connectionString.protocol === 'sqlite') {
    const dbFile =
        './' +
        (connectionString.hosts ? connectionString.hosts[0].name : '') +
        (connectionString.path ? '/' + connectionString.path[0] : '');
    module.exports = {
        type: 'sqlite',
        database: dbFile,
        entities: [...libs, ...apps].map(lib => `${lib[sourceRootKey]}/**/entities/**/*.entity.${DB_SOURCE_EXT}`),
        migrations: [...libs, ...apps].map(lib => `${lib[sourceRootKey]}/**/migrations/**/*.${DB_SOURCE_EXT}`),
        subscribers: [...libs, ...apps].map(lib => `${lib[sourceRootKey]}/**/subscribers/**/*.${DB_SOURCE_EXT}`),
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: `${defaultApp[sourceRootKey]}/migrations`
        }
    }
} else {
    module.exports = {
        type: connectionString.protocol,
        host: connectionString.hosts && connectionString.hosts[0].name,
        port: connectionString.hosts && +connectionString.hosts[0].port,
        username: connectionString.user,
        password: connectionString.password,
        database: connectionString.path && connectionString.path[0],
        entities: [...libs, ...apps].map(lib => `${lib[sourceRootKey]}/**/entities/**/*.entity.${DB_SOURCE_EXT}`),
        migrations: [...libs, ...apps].map(lib => `${lib[sourceRootKey]}/**/migrations/**/*.${DB_SOURCE_EXT}`),
        subscribers: [...libs, ...apps].map(lib => `${lib[sourceRootKey]}/**/subscribers/**/*.${DB_SOURCE_EXT}`),
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: `${defaultApp[sourceRootKey]}/migrations`
        }
    }
}