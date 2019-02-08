import { ApiModelProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiModelProperty({ type: Number })
  perPage: number;

  @ApiModelProperty({ type: Number })
  totalPages: number;

  @ApiModelProperty({ type: Number })
  totalResults: number;

  @ApiModelProperty({ type: Number })
  curPage: number;
}
