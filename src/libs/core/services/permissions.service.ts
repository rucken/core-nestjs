import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';


@Component()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private readonly repository: Repository<Permission>
    ) {
    }
    async create(item: Permission) {
        try {
            item = await this.repository.save(item);
            return { permission: item };
        } catch (error) {
            throw error;
        }
    }
    async update(id: number, item: Permission) {
        item.id = id;
        try {
            item = await this.repository.save(item);
            return { permission: item };
        } catch (error) {
            throw error;
        }
    }
    async delete(id: number) {
        try {
            await this.repository.delete(id);
            return { permission: null };
        } catch (error) {
            throw error;
        }
    }
    async load(id: number) {
        try {
            const item = await this.repository.findOneOrFail(
                id,
                { relations: ['contentType'] }
            );
            return { permission: item };
        } catch (error) {
            throw error;
        }
    }
    async loadAll(
        curPage: number,
        perPage: number,
        q: string,
        group: number,
        contentType: number
    ) {
        try {
            let objects: [Permission[], number];
            let qb = this.repository.createQueryBuilder('permission');
            qb = qb.leftJoinAndSelect('permission.contentType', 'contentType');
            if (group) {
                qb = qb
                    .leftJoin('permission.groups', 'group')
                    .where('group.id = :group', { group: group });
            }
            if (q) {
                qb = qb.where('permission.name like :q or permission.title like :q or permission.id = :id', { q: `%${q}%`, id: +q });
            }
            if (contentType) {
                qb = qb.where('contentType.id = :contentType', { contentType: contentType });
            }
            qb = qb.orderBy('permission.id', 'DESC');
            qb = qb.skip((curPage - 1) * perPage)
                .take(perPage);
            objects = await qb.getManyAndCount();
            return {
                permissions: objects[0],
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