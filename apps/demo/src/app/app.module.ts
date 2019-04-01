import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuckenAuthModule } from '@rucken/auth-nestjs';
import { RuckenCoreModule } from '@rucken/core-nestjs';
@Module({})
export class AppModule {
  static forRoot(options: { providers: Provider[]; passportProviders: Provider[] }): DynamicModule {
    return {
      module: AppModule,
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        RuckenCoreModule.forRoot(options),
        RuckenAuthModule.forRoot(options),
        TypeOrmModule.forRoot()
      ],
      providers: [...options.providers, ...(options.passportProviders ? options.passportProviders : [])]
    };
  }
}
