import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  MethodNotAllowedException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CORE_CONFIG_TOKEN } from '../configs/core.config';
import { Permissions } from '../decorators/permissions.decorator';
import { Roles } from '../decorators/roles.decorator';
import { InContentTypeDto } from '../dto/in-content-type.dto';
import { OutContentTypeDto } from '../dto/out-content-type.dto';
import { OutContentTypesDto } from '../dto/out-content-types.dto';
import { ContentType } from '../entities/content-type.entity';
import { ICoreConfig } from '../interfaces/core-config.interface';
import { ParseIntWithDefaultPipe } from '../pipes/parse-int-with-default.pipe';
import { ContentTypesService } from '../services/content-types.service';

@ApiUseTags('content-types')
@ApiBearerAuth()
@Controller('/api/content_types')
export class ContentTypesController {
  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    private readonly service: ContentTypesService
  ) {}

  @Roles('isSuperuser')
  @Permissions('add_content-type')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: OutContentTypeDto,
    description: 'The record has been successfully created.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @Post()
  async create(@Body() dto: InContentTypeDto) {
    try {
      return plainToClass(
        OutContentTypeDto,
        await this.service.create({
          item: plainToClass(ContentType, dto)
        })
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions('change_content-type')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutContentTypeDto,
    description: 'The record has been successfully updated.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', type: Number })
  @Put(':id')
  async update(@Param('id', new ParseIntPipe()) id, @Body() dto: InContentTypeDto) {
    if (this.coreConfig.demo) {
      throw new MethodNotAllowedException('Not allowed in DEMO mode');
    }
    try {
      return plainToClass(
        OutContentTypeDto,
        await this.service.update({
          id,
          item: plainToClass(ContentType, dto)
        })
      );
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
  async delete(@Param('id', new ParseIntPipe()) id) {
    if (this.coreConfig.demo) {
      throw new MethodNotAllowedException('Not allowed in DEMO mode');
    }
    try {
      return plainToClass(
        OutContentTypeDto,
        await this.service.delete({
          id
        })
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions('read_content-type')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutContentTypeDto,
    description: ''
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', type: Number })
  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id) {
    try {
      return plainToClass(
        OutContentTypeDto,
        await this.service.findById({
          id
        })
      );
    } catch (error) {
      throw error;
    }
  }

  @Roles('isSuperuser')
  @Permissions('read_content-type')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutContentTypesDto,
    description: ''
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiImplicitQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Text for search (default: empty)'
  })
  @ApiImplicitQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Column name for sort (default: -id)'
  })
  @ApiImplicitQuery({
    name: 'per_page',
    required: false,
    type: Number,
    description: 'Number of results to return per page. (default: 10)'
  })
  @ApiImplicitQuery({
    name: 'cur_page',
    required: false,
    type: Number,
    description: 'A page number within the paginated result set. (default: 1)'
  })
  @Get()
  async findAll(
    @Query('cur_page', new ParseIntWithDefaultPipe(1)) curPage,
    @Query('per_page', new ParseIntWithDefaultPipe(10)) perPage,
    @Query('q') q,
    @Query('sort') sort
  ) {
    try {
      return plainToClass(
        OutContentTypesDto,
        await this.service.findAll({
          curPage,
          perPage,
          q,
          sort
        })
      );
    } catch (error) {
      throw error;
    }
  }
}
