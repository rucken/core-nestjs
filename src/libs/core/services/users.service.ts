import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) {
    }
    async create(options: { item: User }) {
        if (options.item.isSuperuser && process.env.DEMO === 'true') {
            throw new MethodNotAllowedException('Not allowed in DEMO mode');
        }
        try {
            options.item = await this.repository.save(options.item);
            return { user: options.item };
        } catch (error) {
            throw error;
        }
    }
    async update(options: { id: number; item: User }) {
        if (process.env.DEMO === 'true') {
            throw new MethodNotAllowedException('Not allowed in DEMO mode');
        }
        options.item.id = options.id;
        try {
            options.item = await this.repository.save(options.item);
            return { user: options.item };
        } catch (error) {
            throw error;
        }
    }
    async delete(options: { id: number }) {
        if (process.env.DEMO === 'true') {
            throw new MethodNotAllowedException('Not allowed in DEMO mode');
        }
        try {
            let object = await this.repository.findOneOrFail(
                options.id
            );
            object.groups = [];
            object = await this.repository.save(object);
            await this.repository.delete(options.id);
            return { user: null };
        } catch (error) {
            throw error;
        }
    }
    async load(options: { id: number }) {
        try {
            const item = await this.repository.findOneOrFail(
                options.id,
                { relations: ['groups', 'groups.permissions'] }
            );
            return { user: item };
        } catch (error) {
            throw error;
        }
    }
    async loadAll(options: {
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
                qb = qb.leftJoinAndSelect('user.groups', 'group')
                    .where('group.id = :group', { group: options.group });
            } else {
                qb = qb.leftJoinAndSelect('user.groups', 'group');
                qb = qb.leftJoinAndSelect('group.permissions', 'permission');
                qb = qb.leftJoinAndSelect('permission.contentType', 'contentType');
            }
            if (options.q) {
                qb = qb.where('user.first_name like :q or user.last_name like :q or user.username like :q or user.id = :id', {
                    q: `%${options.q}%`, id: +options.q
                });
            }
            options.sort = options.sort && (new User()).hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
            const field = options.sort.replace('-', '');
            if (options.sort) {
                if (options.sort[0] === '-') {
                    qb = qb.orderBy('user.' + field, 'DESC');
                } else {
                    qb = qb.orderBy('user.' + field, 'ASC');
                }
            }
            qb = qb.skip((options.curPage - 1) * options.perPage)
                .take(options.perPage);
            objects = await qb.getManyAndCount();
            return {
                users: objects[0],
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