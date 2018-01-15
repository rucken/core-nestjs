import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { PermissionDto } from './permission.dto';


export class OutPermissionDto {
    @Type(() => PermissionDto)
    @ApiModelProperty({ type: PermissionDto })
    permission: PermissionDto;
}