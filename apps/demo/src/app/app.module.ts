import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, AUTH_PASSPORT_STRATAGIES } from '@rucken/auth-nestjs';
import { CoreModule } from '@rucken/core-nestjs';

@Module({})
export class AppModule {
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: AppModule,
      imports: [TypeOrmModule.forRoot(), AuthModule.forRoot(options), CoreModule.forRoot(options)],
      providers: [...AUTH_PASSPORT_STRATAGIES]
    };
  }
}
