import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MetaDto } from '../dto/meta.dto';
import { UserDto } from '../dto/user.dto';

export class OutUsersDto {
  @Type(() => UserDto)
  @ApiModelProperty({ type: UserDto, isArray: true })
  users: UserDto[];

  @Type(() => MetaDto)
  @ApiModelProperty({ type: MetaDto })
  meta: MetaDto;
}
