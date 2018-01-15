import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from '../../libs/core/core.module';
import { entities } from '../../libs/core/entities/index';

@Module({
  modules: [
    TypeOrmModule.forRoot(),
    CoreModule
  ],
  controllers: []
})
export class AppModule { }
