import { Injectable } from '@nestjs/common';
import { plainToClassFromExist } from 'class-transformer';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class AccountService {
  constructor(private readonly usersService: UsersService) {}

  async update(options: { id: number; user: User }) {
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
