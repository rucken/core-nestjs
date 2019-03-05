import { Inject, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CORE_CONFIG_TOKEN } from '../configs/core.config';
import { Permission } from '../entities/permission.entity';
import { ICoreConfig } from '../interfaces/core-config.interface';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>
  ) {}

  async create(options: { item: Permission }) {
    try {
      options.item = await this.repository.save(options.item);
      return { permission: options.item };
    } catch (error) {
      throw error;
    }
  }

  async update(options: { id: number; item: Permission }) {
    options.item.id = options.id;
    try {
      options.item = await this.repository.save(options.item);
      return { permission: options.item };
    } catch (error) {
      throw error;
    }
  }

  async delete(options: { id: number }) {
    try {
      await this.repository.delete(options.id);
      return { permission: null };
    } catch (error) {
      throw error;
    }
  }

  async findById(options: { id: number }) {
    try {
      const item = await this.repository.findOneOrFail(options.id, {
        relations: ['contentType']
      });
      return { permission: item };
    } catch (error) {
      throw error;
    }
  }

  async findAll(options: {
    curPage: number;
    perPage: number;
    q?: string;
    group?: number;
    contentType?: number;
    sort?: string;
  }) {
    try {
      let objects: [Permission[], number];
      let qb = this.repository.createQueryBuilder('permission');
      qb = qb.leftJoinAndSelect('permission.contentType', 'contentType');
      if (options.group) {
        qb = qb.leftJoin('permission.groups', 'group').where('group.id = :group', { group: options.group });
      }
      if (options.q) {
        qb = qb.where('permission.name like :q or permission.title like :q or permission.id = :id', {
          q: `%${options.q}%`,
          id: +options.q
        });
      }
      if (options.contentType) {
        qb = qb.where('contentType.id = :contentType', {
          contentType: options.contentType
        });
      }
      options.sort =
        options.sort && new Permission().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
      const field = options.sort.replace('-', '');
      if (options.sort) {
        if (options.sort[0] === '-') {
          qb = qb.orderBy('permission.' + field, 'DESC');
        } else {
          qb = qb.orderBy('permission.' + field, 'ASC');
        }
      }
      qb = qb.skip((options.curPage - 1) * options.perPage).take(options.perPage);
      objects = await qb.getManyAndCount();
      return {
        permissions: objects[0],
        meta: {
          perPage: options.perPage,
          totalPages: options.perPage > objects[1] ? 1 : Math.ceil(objects[1] / options.perPage),
          totalResults: objects[1],
          curPage: options.curPage
        }
      };
    } catch (error) {
      throw error;
    }
  }
}
