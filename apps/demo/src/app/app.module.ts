import { DynamicModule, Module, Provider, HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, AUTH_PASSPORT_STRATAGIES } from '@rucken/auth-nestjs';
import { CoreModule } from '@rucken/core-nestjs';
@Module({})
export class AppModule {
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypeOrmModule.forRoot(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        AuthModule.forRoot(options),
        CoreModule.forRoot(options)
      ],
      providers: [...AUTH_PASSPORT_STRATAGIES]
    };
  }
}
