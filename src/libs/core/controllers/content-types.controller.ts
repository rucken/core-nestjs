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
import { InContentTypeDto } from '../dto/in-content-type.dto';
import { OutContentTypeDto } from '../dto/out-content-type.dto';
import { OutContentTypesDto } from '../dto/out-content-types.dto';
import { ContentType } from '../entities/content-type.entity';
import { AccessGuard } from '../guards/access.guard';
import { ParseIntWithDefaultPipe } from '../pipes/parse-int-with-default.pipe';
import { Permissions } from '../decorators/permissions.decorator';

@ApiUseTags('content-types')
@ApiBearerAuth()
@Controller('/api/content-types')
@UseGuards(AccessGuard)
export class ContentTypesController {
    constructor(
        @InjectRepository(ContentType)
        private readonly contentTypeRepository: Repository<ContentType>
    ) {

    }
    @Roles('isSuperuser')
    @Permissions('add_content-type')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: HttpStatus.CREATED, type: OutContentTypeDto,
        description: 'The record has been successfully created.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @Post()
    async create(
        @Body() dto: InContentTypeDto
        ) {
        try {
            let object = plainToClass(ContentType, dto);
            object = await this.contentTypeRepository.save(object)
            return plainToClass(OutContentTypeDto, object);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('change_content-type')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutContentTypeDto,
        description: 'The record has been successfully updated.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitParam({ name: 'id', type: Number })
    @Put(':id')
    async update(
        @Param('id', new ParseIntPipe()) id,
        @Body() dto: InContentTypeDto
        ) {
        try {
            let object = plainToClass(ContentType, dto);
            object.id = id;
            object = await this.contentTypeRepository.save(object);
            return plainToClass(OutContentTypeDto, object);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('delete_content-type')
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
            return await this.contentTypeRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('read_content-type')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutContentTypeDto,
        description: ''
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiImplicitParam({ name: 'id', type: Number })
    @Get(':id')
    async load(
        @Param('id', new ParseIntPipe()) id
        ) {
        try {
            let object = await this.contentTypeRepository.findOneOrFail(id);
            return plainToClass(OutContentTypeDto, object);
        } catch (error) {
            throw error;
        }
    }
    @Roles('isSuperuser')
    @Permissions('read_content-type')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK, type: OutContentTypesDto,
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
            const objects = await this.contentTypeRepository.findAndCount({
                skip: (curPage - 1) * perPage,
                take: perPage
            });
            return plainToClass(OutContentTypesDto, {
                contentTypes: objects[0],
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