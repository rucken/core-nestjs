import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { MetaDto } from './meta.dto';
import { GroupWithPermissionsDto } from './group-with-permissions.dto';

export class OutGroupsDto {
    @Type(() => GroupWithPermissionsDto)
    @ApiModelProperty({ type: GroupWithPermissionsDto, isArray: true })
    groups: GroupWithPermissionsDto[];
    @Type(() => MetaDto)
    @ApiModelProperty({ type: MetaDto })
    meta: MetaDto;
}