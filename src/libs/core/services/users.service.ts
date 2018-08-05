import {
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CORE_CONFIG_TOKEN } from '../configs/core.config';
import { User } from '../entities/user.entity';
import { ICoreConfig } from '../interfaces/core-config.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    @InjectRepository(User) private readonly repository: Repository<User>
  ) {}
  async create(options: { item: User }) {
    if (options.item.isSuperuser && this.coreConfig.demo) {
      throw new MethodNotAllowedException('Not allowed in DEMO mode');
    }
    try {
      options.item = await this.repository.save(options.item);
      const { user } = await this.findById({ id: options.item.id });
      return { user };
    } catch (error) {
      throw error;
    }
  }
  async update(options: { id: number; item: User }) {
    if (this.coreConfig.demo) {
      throw new MethodNotAllowedException('Not allowed in DEMO mode');
    }
    options.item.lastLogin = new Date();
    options.item.id = options.id;
    try {
      options.item = await this.repository.save(options.item);
      const { user } = await this.findById({ id: options.item.id });
      return { user };
    } catch (error) {
      throw error;
    }
  }
  async delete(options: { id: number }) {
    if (this.coreConfig.demo) {
      throw new MethodNotAllowedException('Not allowed in DEMO mode');
    }
    try {
      let object = await this.repository.findOneOrFail(options.id);
      object.groups = [];
      object = await this.repository.save(object);
      await this.repository.delete(options.id);
      return { user: null };
    } catch (error) {
      throw error;
    }
  }
  async findById(options: { id: number }) {
    try {
      const item = await this.repository.findOneOrFail(options.id, {
        relations: ['groups', 'groups.permissions']
      });
      return { user: item };
    } catch (error) {
      throw error;
    }
  }
  async findAll(options: {
    curPage: number;
    perPage: number;
    q?: string;
    group?: number;
    sort?: string;
  }) {
    try {
      let objects: [User[], number];
      let qb = this.repository.createQueryBuilder('user');
      if (options.group) {
        qb = qb
          .leftJoinAndSelect('user.groups', 'group')
          .where('group.id = :group', { group: options.group });
      } else {
        qb = qb.leftJoinAndSelect('user.groups', 'group');
        qb = qb.leftJoinAndSelect('group.permissions', 'permission');
        qb = qb.leftJoinAndSelect('permission.contentType', 'contentType');
      }
      if (options.q) {
        qb = qb.where(
          'user.first_name like :q or user.last_name like :q or user.username like :q or user.id = :id',
          {
            q: `%${options.q}%`,
            id: +options.q
          }
        );
      }
      options.sort =
        options.sort && new User().hasOwnProperty(options.sort.replace('-', ''))
          ? options.sort
          : '-id';
      const field = options.sort.replace('-', '');
      if (options.sort) {
        if (options.sort[0] === '-') {
          qb = qb.orderBy('user.' + field, 'DESC');
        } else {
          qb = qb.orderBy('user.' + field, 'ASC');
        }
      }
      qb = qb
        .skip((options.curPage - 1) * options.perPage)
        .take(options.perPage);
      objects = await qb.getManyAndCount();
      return {
        users: objects[0],
        meta: {
          perPage: options.perPage,
          totalPages:
            options.perPage > objects[1]
              ? 1
              : Math.ceil(objects[1] / options.perPage),
          totalResults: objects[1],
          curPage: options.curPage
        }
      };
    } catch (error) {
      throw error;
    }
  }
  async findByEmail(options: { email: string }) {
    try {
      const item = await this.repository.findOneOrFail({
        where: {
          email: options.email
        },
        relations: ['groups', 'groups.permissions']
      });
      return {
        user: item
      };
    } catch (error) {
      throw new NotFoundException(
        `User with email "${options.email}" not founded`
      );
    }
  }
  async findByUserName(options: { username: string }) {
    try {
      const item = await this.repository.findOneOrFail({
        where: {
          username: options.username
        },
        relations: ['groups', 'groups.permissions']
      });
      return {
        user: item
      };
    } catch (error) {
      throw new NotFoundException(
        `User with username "${options.username}" not founded`
      );
    }
  }
}
