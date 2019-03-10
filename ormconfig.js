const fg = require('fast-glob');
const ConnectionString = require('connection-string');
const load = require('dotenv').load;
const fs = require('fs');
const path = require('path');
const runnedInMigration = process.env.MIGRATIONS === 'true';
const envName = process.env.NODE_ENV || 'develop';
const isDevelop = envName === 'develop';
const sourceRootKey = isDevelop ? 'sourceRoot' : 'outputPath';
const entitiesExt = '{.js,.ts}';;
const angularJson = JSON.parse(fs.readFileSync('angular.json'));
const packageJson = JSON.parse(fs.readFileSync('package.json'));
const vendors = packageJson.externalLibs || [];
try {
    fs.accessSync(`${envName}.env`);
    load({ path: `${envName}.env` });
    console.log(`env file: ${envName}.env`);
} catch (error) {
    console.log(`error on get env file: ${envName}.env`);
    try {
        fs.accessSync(`.env`);
        load();
        console.log(`env file: .env`);
    } catch (error) {
        console.log(`error on get env file: .env`);
    }
}

const connectionString = new ConnectionString(process.env.DATABASE_URL || 'sqlite://database/sqlitedb.db');
const vendorsLibs = Object.keys(vendors).map(index => {
    const vendorConfig = {};
    vendorConfig[sourceRootKey] = vendors[index];
    return vendorConfig;
});
const libs = Object.keys(angularJson.projects).filter(key => angularJson.projects[key].projectType === 'library').map(key => angularJson.projects[key]);
const apps = Object.keys(angularJson.projects).filter(key => angularJson.projects[key].projectType === 'application').map(key => angularJson.projects[key]);
const defaultProject = angularJson.defaultProject;
const defaultApp = angularJson.projects[defaultProject];
const migrationsDir = `${defaultApp[sourceRootKey]}/migrations`;

const entities = (
    fg.sync(
        [
            ...(
                runnedInMigration ? [
                    ...vendorsLibs,
                    ...libs,
                    ...apps
                ].map(lib =>
                    `${lib[sourceRootKey] || lib.architect.build.options[sourceRootKey]}/**/migrations_entities/**/*.entity${entitiesExt}`
                ) : []
            ),
            ...(
                !runnedInMigration ? [
                    ...vendorsLibs,
                    ...libs,
                    ...apps
                ].map(lib =>
                    `${lib[sourceRootKey] || lib.architect.build.options[sourceRootKey]}/**entities/**/*.entity${entitiesExt}`
                ) : []
            )
        ]
    )
);
const migrations = normalizationFileList(
    fg.sync(
        runnedInMigration ? [
            ...vendorsLibs,
            ...libs,
            ...apps
        ].map(lib =>
            `${lib[sourceRootKey] || lib.architect.build.options[sourceRootKey]}/**/migrations/**/*${entitiesExt}`
        ) : []
    )
);
const subscribers = (
    fg.sync(
        [
            ...vendorsLibs,
            ...libs,
            ...apps
        ].map(lib =>
            `${lib[sourceRootKey] || lib.architect.build.options[sourceRootKey]}/**/subscribers/**/*${entitiesExt}`
        )
    )
);
if (connectionString.protocol === 'sqlite') {
    const dbFile =
        './' +
        (connectionString.hosts ? connectionString.hosts[0].name : '') +
        (connectionString.path ? '/' + connectionString.path[0] : '');
    module.exports = {
        type: 'sqlite',
        database: dbFile,
        entities: entities,
        migrations: migrations,
        subscribers: subscribers,
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: migrationsDir
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
        entities: entities,
        migrations: migrations,
        subscribers: subscribers,
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: migrationsDir
        }
    }
}

function normalizationFileList(files) {
    const newFiles = [];
    for (var i = 0; i < files.length; i++) {
        const filename = files[i];
        if (filename.indexOf('.d.ts') === -1) {
            var founded = false;
            for (var j = 0; j < newFiles.length; j++) {
                const filename = newFiles[j];
                if (
                    path.basename(filename, path.parse(filename).ext) ===
                    path.basename(files[i], path.parse(files[i]).ext)
                ) {
                    founded = true;
                }
            }
            if (!founded) {
                newFiles.push(files[i]);
            }
        }
    }
    return newFiles;
}