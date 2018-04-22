import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Permissions } from '../decorators/permissions.decorator';
import { Roles } from '../decorators/roles.decorator';
import { InPermissionDto } from '../dto/in-permission.dto';
import { OutPermissionDto } from '../dto/out-permission.dto';
import { OutPermissionsDto } from '../dto/out-permissions.dto';
import { Permission } from '../entities/permission.entity';
import { AccessGuard } from '../guards/access.guard';
import { ParseIntWithDefaultPipe } from '../pipes/parse-int-with-default.pipe';
import { PermissionsService } from '../services/permissions.service';


@ApiUseTags('permissions')
@ApiBearerAuth()
@Controller('/api/permissions')
@UseGuards(AccessGuard)
export class PermissionsController {
    constructor(
        private readonly service: PermissionsService
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
            return plainToClass(
                OutPermissionDto,
                await this.service.create({
                    item: plainToClass(Permission, dto)
                })
            );
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
            return plainToClass(
                OutPermissionDto,
                await this.service.update({
                    id: id,
                    item: plainToClass(Permission, dto)
                })
            );
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
            return plainToClass(OutPermissionDto,
                await this.service.delete({
                    id: id
                })
            );
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
            return plainToClass(
                OutPermissionDto,
                await this.service.load({
                    id: id
                })
            );
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
    @ApiImplicitQuery({ name: 'sort', required: false, type: String, description: 'Column name for sort (default: -id)' })
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
        @Query('content_type') contentType,
        @Query('sort') sort
    ) {
        try {
            return plainToClass(
                OutPermissionsDto,
                await this.service.loadAll({
                    curPage: curPage,
                    perPage: perPage,
                    q: q,
                    sort: sort,
                    group: group,
                    contentType: contentType
                })
            );
        } catch (error) {
            throw error;
        }
    }
}