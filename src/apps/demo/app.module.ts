import { Module, DynamicModule, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '@rucken/core-nestjs';
import { AuthModule } from '@rucken/auth-nestjs';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CoreModule,
    AuthModule
  ]
})
export class AppModule {
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypeOrmModule.forRoot(),
        CoreModule.forRoot(options),
        AuthModule.forRoot(options)
      ]
    };
  }
}
