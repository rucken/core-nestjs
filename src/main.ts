import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AUTH_CONFIG_TOKEN, IAuthConfig } from 'libs/core/configs/auth.config';
import { CORE_CONFIG_TOKEN, ICoreConfig } from 'libs/core/configs/core.config';
import { appPipes } from 'libs/core/pipes';
import * as path from 'path';
import { AppModule } from './apps/demo/app.module';
import { appFilters } from './libs/core/filters';
import { accessSync } from 'fs';

async function bootstrap() {
  const packageBody = require('../package.json');
  const WWW_ROOT = path.resolve(__dirname, '..', 'www');
  const nodeEnv = process.env.NODE_ENV;
  try {
    accessSync(`${nodeEnv}.env`);
    config({ path: `${nodeEnv}.env` });
    // tslint:disable-next-line:no-console
    console.log(`env file: ${nodeEnv}.env`);
  } catch (error) {
    try {
      accessSync(`.env`);
      config();
      // tslint:disable-next-line:no-console
      console.log(`env file: .env`);
    } catch (error) {
    }
  }
  const coreConfig: ICoreConfig = {
    debug: process.env.DEBUG === 'true',
    demo: process.env.DEMO === 'true',
    port: process.env.PORT ? +process.env.PORT : undefined
  };
  const authConfig: IAuthConfig = {
    jwt: {
      authHeaderPrefix: process.env.JWT_AUTH_HEADER_PREFIX,
      expirationDelta: process.env.JWT_EXPIRATION_DELTA,
      secretKey: process.env.SECRET_KEY
    }
  };
  const app = await NestFactory.create(AppModule.forRoot({
    providers: [
      { provide: CORE_CONFIG_TOKEN, useValue: coreConfig },
      { provide: AUTH_CONFIG_TOKEN, useValue: authConfig },
      ...appFilters,
      ...appPipes
    ]
  }), { cors: true });
  app.useStaticAssets(WWW_ROOT);

  let documentBuilder = new DocumentBuilder()
    .setTitle(packageBody.name)
    .setDescription(packageBody.description)
    .setContactEmail(packageBody.author.email)
    .setExternalDoc('Project on Github', packageBody.homepage)
    .setLicense(packageBody.license, '')
    .setVersion(packageBody.version)
    .addBearerAuth('Authorization', 'header');

  if (coreConfig.debug) {
    documentBuilder = documentBuilder
      .setSchemes('http');
  } else {
    documentBuilder = documentBuilder
      .setSchemes('https', 'http');
  }
  const options = documentBuilder.build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/swagger', app, document);

  await app.listen(coreConfig.port ? coreConfig.port : 5000);
}
bootstrap();
