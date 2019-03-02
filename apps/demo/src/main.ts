import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { register } from 'tsconfig-paths';
import { AppModule } from './app/app.module';
import { config } from './app/config/config';

/* hmr
declare const module: any;
*/

/**
 * Link tsconfig paths
 */
if (config.env.name !== 'develop') {
  register({
    baseUrl: config.project.path,
    paths: config.project.tsconfig.compilerOptions.paths
  });
}
async function bootstrap() {
  /**
   * Create nest application
   */
  const app = await NestFactory.create(
    AppModule.forRoot({
      providers: [...config.core.providers(), ...config.auth.providers()],
      passportProviders: config.auth.passportProviders()
    }),
    { cors: true }
  );

  /**
   * Add static folders
   */
  config.project.staticFolders.forEach(folder => {
    app.useStaticAssets(folder);
  });

  /**
   * Init swagger
   */
  let documentBuilder = new DocumentBuilder()
    .setTitle(config.project.package.name)
    .setDescription(config.project.package.description)
    .setContactEmail(config.project.package.author.email)
    .setExternalDoc('Project on Github', config.project.package.homepage)
    .setLicense(config.project.package.license, '')
    .setVersion(config.project.package.version)
    .addBearerAuth('Authorization', 'header');
  documentBuilder = documentBuilder.setSchemes(
    config.env.protocol === 'https' ? 'https' : 'http',
    config.env.protocol === 'https' ? 'http' : 'https'
  );
  SwaggerModule.setup('/swagger', app, SwaggerModule.createDocument(app, documentBuilder.build()));

  /**
   * Start nest application
   */
  await app.listen(config.env.port);

  /* hmr
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  */
}
bootstrap();
