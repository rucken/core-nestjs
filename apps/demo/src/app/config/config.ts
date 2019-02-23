import { Logger } from '@nestjs/common';
import {
  AUTH_APP_FILTERS,
  AUTH_APP_GUARDS,
  AUTH_PASSPORT_STRATAGIES,
  DEFAULT_FACEBOOK_CONFIG,
  DEFAULT_GOOGLE_PLUS_CONFIG,
  DEFAULT_JWT_CONFIG,
  FACEBOOK_CONFIG_TOKEN,
  GOOGLE_PLUS_CONFIG_TOKEN,
  JWT_CONFIG_TOKEN
} from '@rucken/auth-nestjs';
import { CORE_APP_FILTERS, CORE_APP_PIPES, CORE_CONFIG_TOKEN, DEFAULT_CORE_CONFIG } from '@rucken/core-nestjs';
import { ConnectionString } from 'connection-string';
import { load } from 'dotenv';
import { accessSync, readFileSync } from 'fs';
import * as path from 'path';
import { IDemoConfig } from './config.interface';

const NODE_ENV = process.env.NODE_ENV || 'develop';
const envFile = resolveRootFile(`${NODE_ENV}.env`);
const connectionString = new ConnectionString(process.env.DATABASE_URL || 'sqlite://database/sqlitedb.db');
const dbFile =
  connectionString.protocol === 'sqlite'
    ? './' +
      (connectionString.hosts ? connectionString.hosts[0].name : '') +
      (connectionString.path ? '/' + connectionString.path[0] : '')
    : '';
try {
  accessSync(envFile);
  load({ path: envFile });
  Logger.log(`env file: ${envFile}`, 'Main');
} catch (error) {
  Logger.log(`error on get env file: ${envFile}`, 'Main');
  try {
    accessSync(`.env`);
    load();
    Logger.log(`env file: .env`, 'Main');
  } catch (error) {
    Logger.log(`error on get env file: .env`, 'Main');
  }
}

export const config: IDemoConfig = {
  env: {
    name: NODE_ENV,
    port: process.env.PORT ? +process.env.PORT : 3000,
    protocol: process.env.PROTOCOL === 'https' ? 'https' : 'http'
  },
  project: {
    path: getRootPath(),
    tsconfig: loadRootJson('tsconfig.json'),
    package: loadRootJson('package.json'),
    staticFolders: [resolveRootFile('client')]
  },
  db: {
    connectionString: connectionString,
    file: dbFile
  },
  core: {
    providers: () => [
      {
        provide: CORE_CONFIG_TOKEN,
        useValue: {
          ...DEFAULT_CORE_CONFIG,
          demo: process.env.DEMO === 'true',
          port: process.env.PORT ? +process.env.PORT : 3000,
          protocol: process.env.PROTOCOL === 'https' ? 'https' : 'http',
          externalPort: process.env.EXTERNAL_PORT ? +process.env.EXTERNAL_PORT : undefined,
          domain: process.env.DOMAIN || ''
        }
      },
      ...CORE_APP_FILTERS,
      ...CORE_APP_PIPES
    ]
  },
  auth: {
    providers: () => [
      {
        provide: JWT_CONFIG_TOKEN,
        useValue: {
          ...DEFAULT_JWT_CONFIG,
          authHeaderPrefix: process.env.JWT_AUTH_HEADER_PREFIX || 'JWT',
          expirationDelta: process.env.JWT_EXPIRATION_DELTA || '7 days',
          secretKey: process.env.JWT_SECRET_KEY || 'secret_key'
        }
      },
      {
        provide: FACEBOOK_CONFIG_TOKEN,
        useValue: {
          ...DEFAULT_FACEBOOK_CONFIG,
          client_id: process.env.FACEBOOK_CLIENT_ID || 'none',
          client_secret: process.env.FACEBOOK_CLIENT_SECRET || 'none',
          oauth_redirect_uri: process.env.FACEBOOK_OAUTH_REDIRECT_URI || 'none'
        }
      },
      {
        provide: GOOGLE_PLUS_CONFIG_TOKEN,
        useValue: {
          ...DEFAULT_GOOGLE_PLUS_CONFIG,
          client_id: process.env.GOOGLE_CLIENT_ID || 'none',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || 'none',
          oauth_redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI || 'none'
        }
      },
      ...AUTH_APP_GUARDS,
      ...AUTH_APP_FILTERS
    ],
    passportProviders: () => AUTH_PASSPORT_STRATAGIES
  }
};
export function getRootPath() {
  return NODE_ENV === 'develop' ? '../../../../../' : '../../../../';
}
export function resolveRootFile(fileName: string) {
  return path.resolve(__dirname, getRootPath(), fileName);
}
export function loadRootJson<T = any>(fileName: string) {
  return JSON.parse(readFileSync(resolveRootFile(fileName)).toString()) as T;
}
