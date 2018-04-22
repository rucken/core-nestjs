import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Permissions } from '../decorators/permissions.decorator';
import { Roles } from '../decorators/roles.decorator';
import { InGroupDto } from '../dto/in-group.dto';
import { OutGroupDto } from '../dto/out-group.dto';
import { OutGroupsDto } from '../dto/out-groups.dto';
import { Group } from '../entities/group.entity';
import { AccessGuard } from '../guards/access.guard';
import { ParseIntWithDefaultPipe } from '../pipes/parse-int-with-default.pipe';
import { GroupsService } from '../services/groups.service';


@ApiUseTags('groups')
@ApiBearerAuth()
@Controller('/api/groups')
@UseGuards(AccessGuard)
export class GroupsController {
    constructor(
        private readonly service: GroupsService
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
            return plainToClass(
                OutGroupDto,
                await this.service.create({
                    item: plainToClass(Group, dto)
                })
            );
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
            return plainToClass(
                OutGroupDto,
                await this.service.update({
                    id: id,
                    item: plainToClass(Group, dto)
                })
            );
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
            return plainToClass(OutGroupDto,
                await this.service.delete({
                    id: id
                })
            );
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
            return plainToClass(
                OutGroupDto,
                await this.service.load({
                    id: id
                })
            );
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
    @ApiImplicitQuery({ name: 'sort', required: false, type: String, description: 'Column name for sort (default: -id)' })
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
        @Query('q') q,
        @Query('sort') sort
    ) {
        try {
            return plainToClass(
                OutGroupsDto,
                await this.service.loadAll({
                    curPage: curPage,
                    perPage: perPage,
                    q: q,
                    sort: sort
                })
            );
        } catch (error) {
            throw error;
        }
    }
}