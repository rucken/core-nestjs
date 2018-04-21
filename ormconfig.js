const ConnectionString = require('connection-string').ConnectionString;
const config = require('dotenv').config;
const path = require('path');

config();

const connectionString = new ConnectionString(process.env.DATABASE_URL);

if (connectionString.protocol === 'sqlite') {
    module.exports = {
        type: 'sqlite',
        database: './' + connectionString.host + (connectionString.segments.length ? '/' + connectionString.segments[0] : ''),
        entities: [
            'src/**/entities/**/*.entity.ts',
        ],
        migrations: [
            'src/**/migrations/**/*.ts'
        ],
        subscribers: [
            'src/**/subscribers/**/*.ts'
        ],
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: 'src/apps/demo/migrations'
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
        entities: [
            'src/**/entities/**/*.entity.ts',
        ],
        migrations: [
            'src/**/migrations/**/*.ts'
        ],
        subscribers: [
            'src/**/subscribers/**/*.ts'
        ],
        logging: 'all',
        synchronize: false,
        cli: {
            migrationsDir: 'src/apps/demo/migrations'
        }
    }
}