import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository, Like } from 'typeorm';

import { Roles } from '../decorators/roles.decorator';
import { InGroupDto } from '../dto/in-group.dto';
import { OutGroupDto } from '../dto/out-group.dto';
import { OutGroupsDto } from '../dto/out-groups.dto';
import { Group } from '../entities/group.entity';
import { AccessGuard } from '../guards/access.guard';
import { ParseIntWithDefaultPipe } from '../pipes/parse-int-with-default.pipe';
import { Permissions } from '../decorators/permissions.decorator';

@ApiUseTags('groups')
@ApiBearerAuth()
@Controller('/api/groups')
@UseGuards(AccessGuard)
export class GroupsController {
    constructor(
        @InjectRepository(Group)
        private readonly groupsRepository: Repository<Group>
    ) {

    }
    @Roles('isSuperuser')
    @Permissions('add_group')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: HttpStatus.CREATED, type: OutGroupDto,
        description: 'The record has been successfully created.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @Post()
    async create(
        @Body() dto: InGroupDto
    ) {
        try {
            let object = plainToClass(Group, dto);
            object = await this.groupsRepository.save(object)
            return plainToClass(OutGroupDto, { group: object });
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('change_group')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutGroupDto,
        description: 'The record has been successfully updated.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitParam({ name: 'id', type: Number })
    @Put(':id')
    async update(
        @Param('id', new ParseIntPipe()) id,
        @Body() dto: InGroupDto
    ) {
        try {
            let object = plainToClass(Group, dto);
            object.id = id;
            object = await this.groupsRepository.save(object);
            return plainToClass(OutGroupDto, { group: object });
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('delete_group')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'The record has been successfully deleted.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitParam({ name: 'id', type: Number })
    @Delete(':id')
    async delete(
        @Param('id', new ParseIntPipe()) id
    ) {
        try {
            let object = await this.groupsRepository.findOneOrFail(
                id,
                { relations: ['permissions'] }
            );
            object.permissions = [];
            object = await this.groupsRepository.save(object);
            return await this.groupsRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('read_group')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutGroupDto,
        description: ''
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitParam({ name: 'id', type: Number })
    @Get(':id')
    async load(
        @Param('id', new ParseIntPipe()) id
    ) {
        try {
            let object = await this.groupsRepository.findOneOrFail(
                id,
                { relations: ['permissions'] }
            );
            return plainToClass(OutGroupDto, { group: object });
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('read_group')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutGroupsDto,
        description: ''
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitQuery({ name: 'q', required: false, type: String, description: 'Text for search (default: empty)' })
    @ApiImplicitQuery({
        name: 'per_page', required: false, type: Number,
        description: 'Number of results to return per page. (default: 10)'
    })
    @ApiImplicitQuery({
        name: 'cur_page', required: false, type: Number,
        description: 'A page number within the paginated result set. (default: 1)'
    })
    @Get()
    async loadAll(
        @Query('cur_page', new ParseIntWithDefaultPipe(1)) curPage,
        @Query('per_page', new ParseIntWithDefaultPipe(10)) perPage,
        @Query('q') q
    ) {
        try {
            let objects: [Group[], number];
            let qb = this.groupsRepository.createQueryBuilder('group');
            qb = qb.leftJoinAndSelect('group.permissions', 'permission');
            qb = qb.leftJoinAndSelect('permission.contentType', 'contentType');
            if (q){
                qb = qb.where('group.title like :q or group.name like :q or group.id = :id', { q: `%${q}%`, id: +q });
            }
            qb = qb.orderBy('group.id', 'DESC');
            qb = qb.skip((curPage - 1) * perPage)
                .take(perPage);
            objects = await qb.getManyAndCount();
            return plainToClass(OutGroupsDto, {
                groups: objects[0],
                meta: {
                    perPage: perPage,
                    totalPages: perPage > objects[1] ? 1 : Math.ceil(objects[1] / perPage),
                    totalResults: objects[1],
                    curPage: curPage
                }
            });
        } catch (error) {
            throw error;
        }
    }
}