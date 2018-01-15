import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

import { AppModule } from './apps/demo/app.module';
import { CustomExceptionFilter } from './libs/core/exceptions/custom-exception.filter';
import { ValidationPipe } from './libs/core/pipes/validation.pipe';
import * as path from 'path';
import * as express from 'express';


async function bootstrap() {
	config();
	const packageBody = require('../package.json');

	const WWW_ROOT = path.resolve(__dirname, '..', 'www');
	const server = express();

	const app = await NestFactory.create(AppModule, server);

	server.use(express.static(WWW_ROOT));
	app.useGlobalFilters(new CustomExceptionFilter());
	app.useGlobalPipes(new ValidationPipe());

	const options = new DocumentBuilder()
		.setTitle(packageBody.name)
		.setDescription(packageBody.description)
		.setContactEmail(packageBody.author.email)
		.setExternalDoc('Project on Github', packageBody.repository)
		.setLicense('MIT', '')
		.setSchemes('https', 'http')
		.setVersion(packageBody.version)
		.addBearerAuth('Authorization', 'header')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	/*
		const stt = require('swagger-test-templates');
		const testsConfig = {
			assertionFormat: 'should',
			testModule: 'request'
		};
		const tests = stt.testGen(document, testsConfig);
		tests.forEach(test => {
			fs.writeFileSync(path.resolve(__dirname, '..', 'tests', test.name), test.test);
		});
	*/
	SwaggerModule.setup('/swagger', app, document);

	await app.listen(process.env.PORT && !isNaN(+process.env.PORT) ? +process.env.PORT : 3000);
}
bootstrap();
