import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';


export class InAccountRegisterDto {

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(254)
    @ApiModelProperty()
    email: string;

    @IsNotEmpty()
    @MaxLength(150)
    @ApiModelProperty()
    username: string;

    @IsNotEmpty()
    @MaxLength(128)
    @ApiModelProperty()
    password: string;
}