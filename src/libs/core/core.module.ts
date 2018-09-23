import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configs } from './configs';
import { controllers } from './controllers';
import { entities } from './entities';
import { services } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...configs, ...services],
  exports: [...configs, ...services]
})
export class CoreModule {
  static forFeature(): DynamicModule {
    return {
      module: CoreModule,
      providers: [...services],
      exports: [...configs, ...services]
    };
  }
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: CoreModule,
      imports: [TypeOrmModule.forFeature([...entities])],
      controllers: [...controllers],
      providers: [...configs, ...options.providers, ...services],
      exports: [...configs, ...services]
    };
  }
}
