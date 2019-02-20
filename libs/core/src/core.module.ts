import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CORE_CONFIGS } from './configs';
import { CORE_CONTROLLERS } from './controllers';
import { CORE_ENTITIES } from './entities';
import { CORE_SERVICES } from './services';

@Module({})
export class CoreModule {
  static forFeature(): DynamicModule {
    return {
      module: CoreModule,
      imports: [TypeOrmModule.forFeature([...CORE_ENTITIES])],
      controllers: [...CORE_CONTROLLERS],
      providers: [...CORE_CONFIGS, ...CORE_SERVICES],
      exports: [...CORE_CONFIGS, ...CORE_SERVICES]
    };
  }

  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: CoreModule,
      imports: [TypeOrmModule.forFeature([...CORE_ENTITIES])],
      controllers: [...CORE_CONTROLLERS],
      providers: [...CORE_CONFIGS, ...options.providers, ...CORE_SERVICES],
      exports: [...CORE_CONFIGS, ...CORE_SERVICES]
    };
  }
}
