import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configs } from './configs';
import { controllers } from './controllers/index';
import { entities } from './entities/index';
import { services } from './services/index';

@Module({
  imports: [
    TypeOrmModule.forFeature([...entities])
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
export class CoreModule {
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: CoreModule,
      imports: [
        TypeOrmModule.forFeature([...entities])
      ],
      controllers: [
        ...controllers
      ],
      providers: [
        ...configs,
        ...options.providers,
        ...services
      ],
      exports: [
        ...services
      ]
    };
  }
}
