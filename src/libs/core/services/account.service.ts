import { Inject, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClassFromExist } from 'class-transformer';
import { Repository } from 'typeorm';
import { CORE_CONFIG_TOKEN } from '../configs/core.config';
import { User } from '../entities/user.entity';
import { ICoreConfig } from '../interfaces/core-config.interface';

@Injectable()
export class AccountService {
  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}
  async update(options: { id: number; user: User }) {
    if (this.coreConfig.demo) {
      throw new MethodNotAllowedException('Not allowed in DEMO mode');
    }
    try {
      let user = await this.usersRepository.findOneOrFail(options.id, {
        relations: ['groups', 'groups.permissions']
      });
      user = plainToClassFromExist(user, options.user);
      await user.setPassword(options.user.password);
      user = await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
