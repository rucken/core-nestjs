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
import { Repository } from 'typeorm';

import { Permissions } from '../decorators/permissions.decorator';
import { Roles } from '../decorators/roles.decorator';
import { InPermissionDto } from '../dto/in-permission.dto';
import { OutPermissionDto } from '../dto/out-permission.dto';
import { OutPermissionsDto } from '../dto/out-permissions.dto';
import { Permission } from '../entities/permission.entity';
import { AccessGuard } from '../guards/access.guard';
import { ParseIntWithDefaultPipe } from '../pipes/parse-int-with-default.pipe';

@ApiUseTags('permissions')
@ApiBearerAuth()
@Controller('/api/permissions')
@UseGuards(AccessGuard)
export class PermissionsController {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionsRepository: Repository<Permission>
    ) {

    }
    @Roles('isSuperuser')
    @Permissions('add_permission')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: HttpStatus.CREATED, type: OutPermissionDto,
        description: 'The record has been successfully created.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @Post()
    async create(
        @Body() dto: InPermissionDto
        ) {
        try {
            let object = plainToClass(Permission, dto);
            object = await this.permissionsRepository.save(object)
            return plainToClass(OutPermissionDto, object);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('change_permission')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutPermissionDto,
        description: 'The record has been successfully updated.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitParam({ name: 'id', type: Number })
    @Put(':id')
    async update(
        @Param('id', new ParseIntPipe()) id,
        @Body() dto: InPermissionDto
        ) {
        try {
            let object = plainToClass(Permission, dto);
            object.id = id;
            object = await this.permissionsRepository.save(object);
            return plainToClass(OutPermissionDto, object);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('delete_permission')
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
            return await this.permissionsRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('read_permission')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutPermissionDto,
        description: ''
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitParam({ name: 'id', type: Number })
    @Get(':id')
    async load(
        @Param('id', new ParseIntPipe()) id
        ) {
        try {
            let object = await this.permissionsRepository.findOneOrFail(id);
            return plainToClass(OutPermissionDto, object);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('read_permission')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutPermissionsDto,
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
    @ApiImplicitQuery({
        name: 'group', required: false, type: Number,
        description: 'Group id for filter data by group. (default: empty)'
    })
    @ApiImplicitQuery({
        name: 'content_type', required: false, type: Number,
        description: 'Content type id for filter data by content type. (default: empty)'
    })
    @Get()
    async loadAll(
        @Query('cur_page', new ParseIntWithDefaultPipe(1)) curPage,
        @Query('per_page', new ParseIntWithDefaultPipe(10)) perPage,
        @Query('q') q,
        @Query('group') group,
        @Query('content_type') contentType
        ) {
        try {
            let objects: [Permission[], number];
            let qb = this.permissionsRepository.createQueryBuilder('permission');
            if (group) {
                qb = qb.leftJoin('permission.groups', 'group')
                    .where('group.id = :group', { group: group });
            }
            if (contentType) {
                qb = qb.leftJoin('permission.content_type', 'content_type')
                    .where('content_type.id = :contentType', { contentType: contentType });
            }
            qb = qb.skip((curPage - 1) * perPage)
                .take(perPage);
            objects = await qb.getManyAndCount();
            return plainToClass(OutPermissionsDto, {
                permissions: objects[0],
                meta: {
                    perPage: perPage,
                    totalPages: perPage > objects[1] ? 1 : (objects[1] / perPage),
                    totalResults: objects[1],
                    curPage: curPage
                }
            });
        } catch (error) {
            throw error;
        }
    }
}