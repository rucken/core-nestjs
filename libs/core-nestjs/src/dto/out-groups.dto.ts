import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GroupWithPermissionsDto } from '../dto/group-with-permissions.dto';
import { MetaDto } from '../dto/meta.dto';

export class OutGroupsDto {
  @Type(() => GroupWithPermissionsDto)
  @ApiProperty({ type: GroupWithPermissionsDto, isArray: true })
  groups: GroupWithPermissionsDto[];

  @Type(() => MetaDto)
  @ApiProperty({ type: MetaDto })
  meta: MetaDto;
}
