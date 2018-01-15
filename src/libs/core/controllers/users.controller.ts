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

import { Roles } from '../decorators/roles.decorator';
import { InUserDto } from '../dto/in-user.dto';
import { OutUserDto } from '../dto/out-user.dto';
import { OutUsersDto } from '../dto/out-users.dto';
import { User } from '../entities/user.entity';
import { AccessGuard } from '../guards/access.guard';
import { ParseIntWithDefaultPipe } from '../pipes/parse-int-with-default.pipe';
import { Permissions } from '../decorators/permissions.decorator';

@ApiUseTags('users')
@ApiBearerAuth()
@Controller('/api/users')
@UseGuards(AccessGuard)
export class UsersController {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {

    }
    @Roles('isSuperuser')
    @Permissions('add_user')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: HttpStatus.CREATED, type: OutUserDto,
        description: 'The record has been successfully created.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @Post()
    async create(
        @Body() dto: InUserDto
        ) {
        try {
            let object = plainToClass(User, dto);
            object.setPassword(object.password);
            object = await this.usersRepository.save(object)
            return plainToClass(OutUserDto, object);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('change_user')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutUserDto,
        description: 'The record has been successfully updated.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitParam({ name: 'id', type: Number })
    @Put(':id')
    async update(
        @Param('id', new ParseIntPipe()) id,
        @Body() dto: InUserDto
        ) {
        try {
            let object = plainToClass(User, dto);
            object.id = id;
            object.setPassword(object.password);
            object = await this.usersRepository.save(object);
            return plainToClass(OutUserDto, object);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('delete_user')
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
            return await this.usersRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('load_user')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutUserDto,
        description: '',
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitParam({ name: 'id', type: Number })
    @Get(':id')
    async load(
        @Param('id', new ParseIntPipe()) id
        ) {
        try {
            let object = await this.usersRepository.findOneOrFail(
                id,
                { relations: ['groups'] }
            );
            return plainToClass(OutUserDto, object);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('load_user')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutUsersDto,
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
    @Get()
    async loadAll(
        @Query('cur_page', new ParseIntWithDefaultPipe(1)) curPage,
        @Query('per_page', new ParseIntWithDefaultPipe(10)) perPage,
        @Query('q') q,
        @Query('group') group
        ) {
        try {
            let objects: [User[], number];
            if (!group) {
                objects = await this.usersRepository.findAndCount({
                    skip: (curPage - 1) * perPage,
                    take: perPage,
                    relations: ['groups']
                });
            } else {
                let qb = this.usersRepository.createQueryBuilder('user');
                if (group) {
                    qb = qb.leftJoinAndSelect('user.groups', 'group')
                        .where('group.id = :group', { group: group })
                }
                qb = qb.skip((curPage - 1) * perPage)
                    .take(perPage);
                objects = await qb.getManyAndCount();
            }
            return plainToClass(OutUsersDto, {
                users: objects[0],
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