import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class InGroupDto {
  @IsOptional()
  id: number;

  @MaxLength(100)
  @ApiModelProperty()
  name: string;

  @MaxLength(255)
  @ApiModelProperty()
  title: string;
}
