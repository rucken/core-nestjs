import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { GroupDto } from './group.dto';
import { GroupWithPermissionsDto } from './group-with-permissions.dto';

export class OutGroupDto {
    @Type(() => GroupWithPermissionsDto)
    @ApiModelProperty({ type: GroupWithPermissionsDto })
    group: GroupWithPermissionsDto;
}