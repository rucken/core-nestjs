import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CORE_CONFIGS } from './configs';
import { CORE_CONTROLLERS } from './controllers';
import { CORE_ENTITIES } from './entities';
import { CORE_SERVICES } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([...CORE_ENTITIES])],
  providers: [...CORE_CONFIGS, ...CORE_SERVICES],
  exports: [...CORE_CONFIGS, ...CORE_SERVICES]
})
export class CoreForFeatureModule {}

@Module({})
export class CoreModule {
  static forFeature(): DynamicModule {
    return {
      module: CoreModule,
      imports: [CoreForFeatureModule]
    };
  }

  static forRoot(options?: { providers: Provider[] }): DynamicModule {
    const providers = options && options.providers ? options.providers : [];
    return {
      module: CoreModule,
      imports: [CoreForFeatureModule],
      controllers: [...CORE_CONTROLLERS],
      providers: [...providers],
      exports: [CoreForFeatureModule]
    };
  }
}
