import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ContentTypeDto } from './content-type.dto';
import { MetaDto } from './meta.dto';

export class OutContentTypesDto {
    @Type(() => ContentTypeDto)
    @ApiModelProperty({ type: ContentTypeDto, isArray: true })
    contentTypes: ContentTypeDto[];
    @Type(() => MetaDto)
    @ApiModelProperty({ type: MetaDto })
    meta: MetaDto;
}