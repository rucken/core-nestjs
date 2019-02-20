const ConnectionString = require('connection-string');
const load = require('dotenv').load;
const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV || 'develop';
const sourceRootKey = NODE_ENV === 'develop' ? 'sourceRoot' : 'outputPath';
const entitiesExt = NODE_ENV === 'develop' ? '{.ts,.js}' : '.js';
const angularConfig = JSON.parse(fs.readFileSync('angular.json'));
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
const libs = Object.keys(angularConfig.projects).filter(key => angularConfig.projects[key].projectType === 'library').map(key => angularConfig.projects[key]);
const apps = Object.keys(angularConfig.projects).filter(key => angularConfig.projects[key].projectType === 'application').map(key => angularConfig.projects[key]);
const defaultProject = angularConfig.defaultProject;
const defaultApp = angularConfig.projects[defaultProject];

if (connectionString.protocol === 'sqlite') {
    const dbFile =
        './' +
        (connectionString.hosts ? connectionString.hosts[0].name : '') +
        (connectionString.path ? '/' + connectionString.path[0] : '');
    module.exports = {
        type: 'sqlite',
        database: dbFile,
        entities: [...libs, ...apps].map(lib => `${lib[sourceRootKey] || lib.architect.build.options[sourceRootKey]}/**/entities/**/*.entity${entitiesExt}`),
        migrations: [...libs, ...apps].map(lib => `${lib[sourceRootKey] || lib.architect.build.options[sourceRootKey]}/**/migrations/**/*${entitiesExt}`),
        subscribers: [...libs, ...apps].map(lib => `${lib[sourceRootKey] || lib.architect.build.options[sourceRootKey]}/**/subscribers/**/*${entitiesExt}`),
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
        entities: [...libs, ...apps].map(lib => `${lib[sourceRootKey] || lib.architect.build.options[sourceRootKey]}/**/entities/**/*.entity${entitiesExt}`),
        migrations: [...libs, ...apps].map(lib => `${lib[sourceRootKey] || lib.architect.build.options[sourceRootKey]}/**/migrations/**/*${entitiesExt}`),
        subscribers: [...libs, ...apps].map(lib => `${lib[sourceRootKey] || lib.architect.build.options[sourceRootKey]}/**/subscribers/**/*${entitiesExt}`),
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: `${defaultApp[sourceRootKey]}/migrations`
        }
    }
}