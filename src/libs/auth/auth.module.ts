import { DynamicModule, MiddlewareConsumer, Module, NestModule, Provider, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities as coreEntities, CoreModule } from '@rucken/core-nestjs';
import { authenticate } from 'passport';
import { configs } from './configs';
import { controllers } from './controllers';
import { entities } from './entities';
import { services } from './services';
import { passportStrategies } from './passport';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      ...coreEntities,
      ...entities
    ]),
    CoreModule.forFeature()
  ],
  controllers: [
    ...controllers
  ],
  providers: [
    ...configs,
    ...services
  ],
  exports: [
    ...services
  ]
})
export class AuthModule implements NestModule {
  static forFeature(): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        HttpModule,
        CoreModule.forFeature()
      ],
      providers: [
        ...services
      ],
      exports: [
        ...services
      ]
    };
  }
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        HttpModule,
        TypeOrmModule.forFeature([
          ...coreEntities,
          ...entities
        ]),
        CoreModule.forFeature()
      ],
      controllers: [
        ...controllers
      ],
      providers: [
        ...configs,
        ...options.providers,
        ...services,
        ...passportStrategies
      ],
      exports: [
        ...services
      ]
    };
  }
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      authenticate('register', { session: false, passReqToCallback: true })
    ).forRoutes('api/auth/register');
    consumer.apply(
      authenticate('login', { session: false, passReqToCallback: true })
    ).forRoutes('api/auth/login');
    consumer
      .apply(
        authenticate('facebook', { session: false })
      ).forRoutes('api/auth/facebook/token');
    consumer
      .apply(
        authenticate('twitter', { session: false })
      ).forRoutes('api/auth/twitter/token');
    consumer
      .apply(
        authenticate('google', { session: false })
      ).forRoutes('api/auth/google/token');
  }
}
