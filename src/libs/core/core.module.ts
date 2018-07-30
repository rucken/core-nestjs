import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    ...services
  ],
  exports: [
    ...services
  ]
})
export class CoreModule {
}
