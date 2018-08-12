import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  appFilters as authAppFilters,
  defaultFacebookConfig,
  defaultJwtConfig,
  FACEBOOK_CONFIG_TOKEN,
  IFacebookConfig,
  IJwtConfig,
  JWT_CONFIG_TOKEN,
  IGooglePlusConfig,
  defaultGooglePlusConfig,
  GOOGLE_PLUS_CONFIG_TOKEN
} from '@rucken/auth-nestjs';
import {
  appFilters,
  appPipes,
  CORE_CONFIG_TOKEN,
  defaultCoreConfig,
  ICoreConfig
} from '@rucken/core-nestjs';
import { AppModule } from './apps/demo/app.module';
import { config } from 'dotenv';
import { accessSync } from 'fs';
import * as path from 'path';

declare const module: any;

async function bootstrap() {
  const ConnectionString = require('connection-string').ConnectionString;
  const chmod = require('chmod');
  const packageBody = require('../package.json');
  const WWW_ROOT = path.resolve(__dirname, '..', 'www');
  const nodeEnv = process.env.NODE_ENV;
  try {
    accessSync(`${nodeEnv}.env`);
    config({ path: `${nodeEnv}.env` });
    Logger.log(`env file: ${nodeEnv}.env`, 'Main');
  } catch (error) {
    try {
      accessSync(`.env`);
      config();
      Logger.log(`env file: .env`, 'Main');
    } catch (error) {}
  }
  const connectionString = new ConnectionString(process.env.DATABASE_URL);
  if (connectionString.protocol === 'sqlite') {
    const dbFile =
      './' +
      connectionString.hosts[0].name +
      (connectionString.path.length ? '/' + connectionString.path[0] : '');
    try {
      chmod(dbFile, 777);
    } catch (error) {}
  }
  const coreConfig: ICoreConfig = {
    ...defaultCoreConfig,
    debug: process.env.DEBUG === 'true',
    demo: process.env.DEMO === 'true',
    port: process.env.PORT ? +process.env.PORT : 3000,
    protocol: process.env.PROTOCOL === 'https' ? 'https' : 'http',
    externalPort: process.env.EXTERNAL_PORT
      ? +process.env.EXTERNAL_PORT
      : undefined,
    domain: process.env.DOMAIN
  };
  const jwtConfig: IJwtConfig = {
    ...defaultJwtConfig,
    authHeaderPrefix: process.env.JWT_AUTH_HEADER_PREFIX,
    expirationDelta: process.env.JWT_EXPIRATION_DELTA,
    secretKey: process.env.JWT_SECRET_KEY
  };
  const facebookConfig: IFacebookConfig = {
    ...defaultFacebookConfig,
    client_id: process.env.FACEBOOK_CLIENT_ID,
    client_secret: process.env.FACEBOOK_CLIENT_SECRET,
    oauth_redirect_uri: process.env.FACEBOOK_OAUTH_REDIRECT_URI
  };
  const googlePlusConfig: IGooglePlusConfig = {
    ...defaultGooglePlusConfig,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    oauth_redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI
  };
  const app = await NestFactory.create(
    AppModule.forRoot({
      providers: [
        { provide: CORE_CONFIG_TOKEN, useValue: coreConfig },
        { provide: JWT_CONFIG_TOKEN, useValue: jwtConfig },
        { provide: FACEBOOK_CONFIG_TOKEN, useValue: facebookConfig },
        { provide: GOOGLE_PLUS_CONFIG_TOKEN, useValue: googlePlusConfig },
        ...appFilters,
        ...authAppFilters,
        ...appPipes
      ]
    }),
    { cors: true }
  );
  app.useStaticAssets(WWW_ROOT);

  let documentBuilder = new DocumentBuilder()
    .setTitle(packageBody.name)
    .setDescription(packageBody.description)
    .setContactEmail(packageBody.author.email)
    .setExternalDoc('Project on Github', packageBody.homepage)
    .setLicense(packageBody.license, '')
    .setVersion(packageBody.version)
    .addBearerAuth('Authorization', 'header');

  if (coreConfig.protocol === 'https') {
    documentBuilder = documentBuilder.setSchemes('https', 'http');
  } else {
    documentBuilder = documentBuilder.setSchemes('http', 'https');
  }
  const options = documentBuilder.build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/swagger', app, document);

  await app.listen(coreConfig.port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
