import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository, AddUserOptions } from 'typeorm';

import { User } from '../entities/user.entity';

@Component()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) {
    }
    async create(item: User) {
        try {
            item = await this.repository.save(item);
            return { user: item };
        } catch (error) {
            throw error;
        }
    }
    async update(id: number, item: User) {
        item.id = id;
        try {
            item = await this.repository.save(item);
            return { user: item };
        } catch (error) {
            throw error;
        }
    }
    async delete(id: number) {
        try {
            let object = await this.repository.findOneOrFail(
                id,
                { relations: ['groups'] }
            );
            object.groups = [];
            object = await this.repository.save(object);
            await this.repository.delete(id);
            return { user: null };
        } catch (error) {
            throw error;
        }
    }
    async load(id: number) {
        try {
            const item = await this.repository.findOneOrFail(
                id,
                { relations: ['groups', 'groups.permissions'] }
            );
            return { user: item };
        } catch (error) {
            throw error;
        }
    }
    async loadAll(
        curPage: number,
        perPage: number,
        q: string,
        group: number,
        sort: string
    ) {
        try {
            let objects: [User[], number];
            let qb = this.repository.createQueryBuilder('user');
            if (group) {
                qb = qb.leftJoinAndSelect('user.groups', 'group')
                    .where('group.id = :group', { group: group })
            } else {
                qb = qb.leftJoinAndSelect('user.groups', 'group');
                qb = qb.leftJoinAndSelect('group.permissions', 'permission');
                qb = qb.leftJoinAndSelect('permission.contentType', 'contentType');
            }
            if (q) {
                qb = qb.where('user.first_name like :q or user.last_name like :q or user.username like :q or user.id = :id', { q: `%${q}%`, id: +q });
            }
            sort = sort && (new User()).hasOwnProperty(sort.replace('-', '')) ? sort : '-id';
            const field = sort.replace('-', '');
            if (sort) {
                if (sort[0] === '-') {
                    qb = qb.orderBy('user.' + field, 'DESC');
                } else {
                    qb = qb.orderBy('user.' + field, 'ASC');
                }
            }
            qb = qb.skip((curPage - 1) * perPage)
                .take(perPage);
            objects = await qb.getManyAndCount();
            return {
                users: objects[0],
                meta: {
                    perPage: perPage,
                    totalPages: perPage > objects[1] ? 1 : Math.ceil(objects[1] / perPage),
                    totalResults: objects[1],
                    curPage: curPage
                }
            };
        } catch (error) {
            throw error;
        }
    }
}