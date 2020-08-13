import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FacebookSignInDto {
  @IsNotEmpty()
  @ApiProperty()
  code: string;
}
