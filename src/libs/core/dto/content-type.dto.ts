import { ApiModelProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class ContentTypeDto {
  @ApiModelProperty({ type: Number })
  id: number;

  @MaxLength(100)
  @ApiModelProperty()
  name: string;

  @MaxLength(255)
  @ApiModelProperty()
  title: string;
}
