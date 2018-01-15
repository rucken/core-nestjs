import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class InTokenDto {

    @ApiModelProperty()
    @IsNotEmpty()
    token: string;
}