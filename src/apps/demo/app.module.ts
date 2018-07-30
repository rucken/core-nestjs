import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../../libs/core/core.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CoreModule
  ]
})
export class AppModule { }
