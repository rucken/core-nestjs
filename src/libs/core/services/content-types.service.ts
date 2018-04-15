import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { ContentType } from '../entities/content-type.entity';

@Component()
export class ContentTypesService {
    constructor(
        @InjectRepository(ContentType)
        private readonly repository: Repository<ContentType>
    ) {
    }
    async create(item: ContentType) {
        try {
            item = await this.repository.save(item);
            return { contentType: item };
        } catch (error) {
            throw error;
        }
    }
    async update(id: number, item: ContentType) {
        item.id = id;
        try {
            item = await this.repository.save(item);
            return { contentType: item };
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
            return { contentType: null };
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
            return { contentType: item };
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
            let objects: [ContentType[], number];
            let qb = this.repository.createQueryBuilder('contentType');
            if (q) {
                qb = qb.where('contentType.name like :q or contentType.title like :q or contentType.id = :id', { q: `%${q}%`, id: +q });
            }
            sort = sort && (new ContentType()).hasOwnProperty(sort.replace('-', '')) ? sort : '-id';
            const field = sort.replace('-', '');
            if (sort) {
                if (sort[0] === '-') {
                    qb = qb.orderBy('contentType.' + field, 'DESC');
                } else {
                    qb = qb.orderBy('contentType.' + field, 'ASC');
                }
            }
            qb = qb.skip((curPage - 1) * perPage)
                .take(perPage);
            objects = await qb.getManyAndCount();
            return {
                contentTypes: objects[0],
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