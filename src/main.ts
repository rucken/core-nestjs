import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import * as express from 'express';
import * as path from 'path';
import { AppModule } from './apps/demo/app.module';
import { CustomExceptionFilter } from './libs/core/exceptions/custom-exception.filter';
import { ValidationPipe } from './libs/core/pipes/validation.pipe';

async function bootstrap() {
  config();
  const packageBody = require('../package.json');

  const WWW_ROOT = path.resolve(__dirname, '..', 'www');
  const app = await NestFactory.create(AppModule);
  app.use(express.static(WWW_ROOT));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });

  app.useGlobalFilters(new CustomExceptionFilter(
    path.join(WWW_ROOT, 'index.html')
  ));
  app.useGlobalPipes(new ValidationPipe());

  let documentBuilder = new DocumentBuilder()
    .setTitle(packageBody.name)
    .setDescription(packageBody.description)
    .setContactEmail(packageBody.author.email)
    .setExternalDoc('Project on Github', packageBody.homepage)
    .setLicense(packageBody.license, '')
    .setVersion(packageBody.version)
    .addBearerAuth('Authorization', 'header');

  if (process.env.DEBUG === 'true') {
    documentBuilder = documentBuilder
      .setSchemes('http');
  } else {
    documentBuilder = documentBuilder
      .setSchemes('https', 'http');
  }
  const options = documentBuilder.build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT && !isNaN(+process.env.PORT) ? +process.env.PORT : 5000);
}
bootstrap();
