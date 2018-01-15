import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { PermissionDto } from './permission.dto';
import { MetaDto } from './meta.dto';

export class OutPermissionsDto {
    @Type(() => PermissionDto)
    @ApiModelProperty({ type: PermissionDto, isArray: true })
    permissions: PermissionDto[];
    @Type(() => MetaDto)
    @ApiModelProperty({ type: MetaDto })
    meta: MetaDto;
}