import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { Group } from '../entities/group.entity';

@Component()
export class GroupsService {
    groups: Group[] = null;
    constructor(
        @InjectRepository(Group)
        private readonly groupsRepository: Repository<Group>
    ) {
        this.loadAll();
    }
    loadAll() {
        if (this.groups === null) {
            this.loadGroups().then((groups) => {
                this.groups = groups;
            });
        }
    }
    getGroupByName(name: string) {
        let groups = this.groups.filter(group => group.name === name);
        if (groups.length) {
            return groups[0];
        }
        return null;
    }
    async loadGroups() {
        try {
            return (await this.groupsRepository.createQueryBuilder('group')
                .leftJoinAndSelect('group.permissions', 'permission')
                .getMany()).map(
                object => plainToClass(Group, object)
                );
        } catch (error) {
            throw error;
        }
    }
}