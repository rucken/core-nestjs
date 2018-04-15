import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { Group } from '../entities/group.entity';

@Component()
export class GroupsService {
    items: Group[] = null;
    constructor(
        @InjectRepository(Group)
        private readonly repository: Repository<Group>
    ) {
        this.fullLoadAll();
    }
    async create(item: Group) {
        try {
            item = await this.repository.save(item);
            return { group: item };
        } catch (error) {
            throw error;
        }
    }
    async update(id: number, item: Group) {
        item.id = id;
        try {
            item = await this.repository.save(item);
            return { group: item };
        } catch (error) {
            throw error;
        }
    }
    async delete(id: number) {
        try {
            let item = await this.repository.findOneOrFail(
                id,
                { relations: ['permissions'] }
            );
            item.permissions = [];
            item = await this.repository.save(item);
            await this.repository.delete(id);
            return { group: null };
        } catch (error) {
            throw error;
        }
    }
    async load(id: number) {
        try {
            const item = await this.repository.findOneOrFail(
                id,
                { relations: ['permissions'] }
            );
            return { group: item };
        } catch (error) {
            throw error;
        }
    }
    async loadAll(
        curPage: number,
        perPage: number,
        q: string,
        sort: string
    ) {
        try {
            let objects: [Group[], number];
            let qb = this.repository.createQueryBuilder('group');
            qb = qb.leftJoinAndSelect('group.permissions', 'permission');
            qb = qb.leftJoinAndSelect('permission.contentType', 'contentType');
            if (q) {
                qb = qb.where('group.title like :q or group.name like :q or group.id = :id', { q: `%${q}%`, id: +q });
            }
            sort = sort && (new Group()).hasOwnProperty(sort.replace('-', '')) ? sort : '-id';
            const field = sort.replace('-', '');
            if (sort) {
                if (sort[0] === '-') {
                    qb = qb.orderBy('group.' + field, 'DESC');
                } else {
                    qb = qb.orderBy('group.' + field, 'ASC');
                }
            }
            qb = qb.skip((curPage - 1) * perPage)
                .take(perPage);
            objects = await qb.getManyAndCount();
            return {
                groups: objects[0],
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
    getGroupByName(name: string) {
        let groups = this.items.filter(group => group.name === name);
        if (groups.length) {
            return groups[0];
        }
        return null;
    }
    async fullLoadAll() {
        if (this.items === null) {
            try {
                const groups = await this.repository.createQueryBuilder('group')
                    .leftJoinAndSelect('group.permissions', 'permission')
                    .getMany();
                this.items = plainToClass(Group, groups);
            } catch (error) {
                throw error;
            }
        }
    }
}