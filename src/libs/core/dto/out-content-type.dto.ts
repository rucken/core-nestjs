import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ContentTypeDto } from './content-type.dto';

export class OutContentTypeDto {
    @Type(() => ContentTypeDto)
    @ApiModelProperty({ type: ContentTypeDto })
    contentType: ContentTypeDto;
}