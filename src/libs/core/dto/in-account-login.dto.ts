import { IsEmail, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class InAccountLoginDto {

    @IsNotEmpty()
    @MaxLength(150)
    @ApiModelProperty()
    username: string;

    @IsNotEmpty()
    @MaxLength(128)
    @ApiModelProperty()
    password: string;
}