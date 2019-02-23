import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserDto } from '../dto/user.dto';

export class OutUserDto {
  @Type(() => UserDto)
  @ApiModelProperty({ type: UserDto })
  user: UserDto;
}
