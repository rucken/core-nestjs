import { DynamicModule, HttpModule, MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '@rucken/core-nestjs';
import { authenticate } from 'passport';
import { AUTH_CONFIGS } from './configs';
import { AUTH_CONTROLLERS } from './controllers';
import { AUTH_ENTITIES } from './entities';
import { AUTH_SERVICES } from './services';

@Module({})
export class AuthModule implements NestModule {
  static forFeature(): DynamicModule {
    return {
      module: AuthModule,
      imports: [HttpModule, CoreModule.forFeature(), TypeOrmModule.forFeature([...AUTH_ENTITIES])],
      controllers: [...AUTH_CONTROLLERS],
      providers: [...AUTH_CONFIGS, ...AUTH_SERVICES],
      exports: [...AUTH_CONFIGS, ...AUTH_SERVICES]
    };
  }

  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: AuthModule,
      imports: [HttpModule, CoreModule.forFeature(), TypeOrmModule.forFeature([...AUTH_ENTITIES])],
      controllers: [...AUTH_CONTROLLERS],
      providers: [...AUTH_CONFIGS, ...options.providers, ...AUTH_SERVICES],
      exports: [...AUTH_CONFIGS, ...AUTH_SERVICES]
    };
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(authenticate('signup', { session: false, passReqToCallback: true })).forRoutes('api/auth/signup');
    consumer.apply(authenticate('signin', { session: false, passReqToCallback: true })).forRoutes('api/auth/signin');
    consumer
      .apply(authenticate('facebook', { session: false, passReqToCallback: true }))
      .forRoutes('api/auth/facebook/token');
    consumer
      .apply(authenticate('google', { session: false, passReqToCallback: true }))
      .forRoutes('api/auth/google-plus/token');
  }
}
