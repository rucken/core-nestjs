import {
  DynamicModule,
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule, entities as coreEntities } from '@rucken/core-nestjs';
import { authenticate } from 'passport';
import { configs } from './configs';
import { controllers } from './controllers';
import { entities } from './entities';
import { passportStrategies } from './passport';
import { services } from './services';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([...coreEntities, ...entities]),
    CoreModule.forFeature()
  ],
  controllers: [...controllers],
  providers: [...configs, ...services],
  exports: [...services]
})
export class AuthModule implements NestModule {
  static forFeature(): DynamicModule {
    return {
      module: AuthModule,
      imports: [HttpModule, CoreModule.forFeature()],
      providers: [...services],
      exports: [...services]
    };
  }
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        HttpModule,
        TypeOrmModule.forFeature([...coreEntities, ...entities]),
        CoreModule.forFeature()
      ],
      controllers: [...controllers],
      providers: [
        ...configs,
        ...options.providers,
        ...services,
        ...passportStrategies
      ],
      exports: [...services]
    };
  }
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        authenticate('signup', { session: false, passReqToCallback: true })
      )
      .forRoutes('api/auth/signup');
    consumer
      .apply(
        authenticate('signin', { session: false, passReqToCallback: true })
      )
      .forRoutes('api/auth/signin');
    consumer
      .apply(
        authenticate('facebook', { session: false, passReqToCallback: true })
      )
      .forRoutes('api/auth/facebook/token');
    consumer
      .apply(
        authenticate('google', { session: false, passReqToCallback: true })
      )
      .forRoutes('api/auth/google-plus/token');
  }
}
