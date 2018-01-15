import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { Repository } from 'typeorm';

import { InAccountLoginDto } from '../dto/in-account-login.dto';
import { InAccountRegisterDto } from '../dto/in-account-register.dto';
import { InTokenDto } from '../dto/in-token.dto';
import { OutAccountTokenDto } from '../dto/out-account-token.dto';
import { User } from '../entities/user.entity';
import { TokenService } from './token.service';
import { InAccountDto } from '../dto/in-account.dto';

@Component()
export class AccountService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly tokenService: TokenService
    ) {

    }
    async info(dto: InTokenDto) {
        try {
            if (this.tokenService.verify(dto.token)) {
                let tokenData: any = this.tokenService.decode(dto.token);
                let object = await this.usersRepository.findOneOrFail(
                    tokenData.id,
                    { relations: ['groups', 'groups.permissions'] }
                );
                if (this.tokenService.getSecretKey(tokenData) === this.tokenService.getSecretKey(object)) {
                    object = await this.usersRepository.save(object);
                    return plainToClass(OutAccountTokenDto, { user: object, token: this.tokenService.sign(object) });
                } else {
                    throw new Error('Invalid token');
                }
            }
        } catch (error) {
            throw error;
        }
    }
    async login(dto: InAccountLoginDto) {
        try {
            let object = plainToClass(User, dto);
            object = await this.usersRepository.findOneOrFail({
                where: {
                    email: object.email
                },
                relations: ['groups', 'groups.permissions']
            });
            if (!object.verifyPassword(dto.password)) {
                throw new Error('Wrong password');
            }
            object = await this.usersRepository.save(object);
            return plainToClass(OutAccountTokenDto, { user: object, token: this.tokenService.sign(object) });
        } catch (error) {
            throw error;
        }
    }
    async register(dto: InAccountRegisterDto) {
        try {
            let object = plainToClass(User, dto);
            object.isActive = false;
            object.isStaff = false;
            object.isSuperuser = false;
            object.username = object.email;
            object.firstName = object.email;
            object.firstName = object.email;
            object.lastName = object.email;
            object.setPassword(object.password);
            object = await this.usersRepository.save(object);
            object = await this.usersRepository.findOneOrFail(
                object.id,
                { relations: ['groups', 'groups.permissions'] }
            );
            return plainToClass(OutAccountTokenDto, { user: object, token: this.tokenService.sign(object) })
        } catch (error) {
            throw error;
        }
    }
    async update(id: number, dto: InAccountDto) {
        try {
            let object = await this.usersRepository.findOneOrFail(id, { relations: ['groups', 'groups.permissions'] });
            object = plainToClassFromExist(object, dto);
            object.setPassword(object.password);
            object = await this.usersRepository.save(object);
            return plainToClass(OutAccountTokenDto, { user: object, token: this.tokenService.sign(object) });
        } catch (error) {
            throw error;
        }
    }
}