import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { GroupDto } from './group.dto';

export class OutGroupDto {
    @Type(() => GroupDto)
    @ApiModelProperty({ type: GroupDto })
    group: GroupDto;
}