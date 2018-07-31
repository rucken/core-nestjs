import { Module, DynamicModule, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../../libs/core/core.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CoreModule
  ]
})
export class AppModule {
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypeOrmModule.forRoot(),
        CoreModule.forRoot(options)
      ]
    };
  }
}
