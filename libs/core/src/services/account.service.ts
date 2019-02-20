import { Inject, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { plainToClassFromExist } from 'class-transformer';
import { CORE_CONFIG_TOKEN } from '../configs/core.config';
import { User } from '../entities/user.entity';
import { ICoreConfig } from '../interfaces/core-config.interface';
import { UsersService } from './users.service';

@Injectable()
export class AccountService {
  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    private readonly usersService: UsersService
  ) {}

  async update(options: { id: number; user: User }) {
    if (this.coreConfig.demo) {
      throw new MethodNotAllowedException('Not allowed in DEMO mode');
    }
    try {
      await this.usersService.assertUsernameAndEmail({
        id: options.id,
        email: options.user.email,
        username: options.user.username
      });
      let { user } = await this.usersService.findById(options);
      user = plainToClassFromExist(user, {
        email: options.user.email,
        password: options.user.password,
        username: options.user.username,
        firstName: options.user.firstName,
        lastName: options.user.lastName
      });
      await user.setPassword(options.user.password);
      return await this.usersService.update({ id: options.id, item: user });
    } catch (error) {
      throw error;
    }
  }
}
