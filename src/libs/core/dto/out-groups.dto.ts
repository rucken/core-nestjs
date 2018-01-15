import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { GroupDto } from './group.dto';
import { MetaDto } from './meta.dto';

export class OutGroupsDto {
    @Type(() => GroupDto)
    @ApiModelProperty({ type: GroupDto, isArray: true })
    groups: GroupDto[];
    @Type(() => MetaDto)
    @ApiModelProperty({ type: MetaDto })
    meta: MetaDto;
}