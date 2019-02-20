import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ContentTypeDto } from '../dto/content-type.dto';
import { MetaDto } from '../dto/meta.dto';

export class OutContentTypesDto {
  @Type(() => ContentTypeDto)
  @ApiModelProperty({ type: ContentTypeDto, isArray: true })
  contentTypes: ContentTypeDto[];

  @Type(() => MetaDto)
  @ApiModelProperty({ type: MetaDto })
  meta: MetaDto;
}
