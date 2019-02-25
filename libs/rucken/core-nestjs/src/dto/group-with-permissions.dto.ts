import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { PermissionDto } from '../dto/permission.dto';

export class GroupWithPermissionsDto {
  @ApiModelProperty({ type: Number })
  id: number;

  @MaxLength(100)
  @ApiModelProperty()
  name: string;

  @MaxLength(255)
  @ApiModelProperty()
  title: string;

  @Type(() => PermissionDto)
  @ApiModelProperty({ type: PermissionDto, isArray: true })
  permissions: PermissionDto[];
}
