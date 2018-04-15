import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { TokenService } from './token.service';
import { CustomError } from '../exceptions/custom.error';

@Component()
export class AccountService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly tokenService: TokenService
    ) {

    }
    async info(token) {
        try {
            if (this.tokenService.verify(token)) {
                let tokenData: any = this.tokenService.decode(token);
                let object = await this.usersRepository.findOneOrFail(
                    tokenData.id,
                    { relations: ['groups', 'groups.permissions'] }
                );
                if (this.tokenService.getSecretKey(tokenData) === this.tokenService.getSecretKey(object)) {
                    object = await this.usersRepository.save(object);
                    return { user: object, token: token }
                } else {
                    throw new CustomError('Invalid token');
                }
            }
        } catch (error) {
            throw error;
        }
    }
    async refresh(token) {
        try {
            if (this.tokenService.verify(token)) {
                let tokenData: any = this.tokenService.decode(token);
                let object = await this.usersRepository.findOneOrFail(
                    tokenData.id,
                    { relations: ['groups', 'groups.permissions'] }
                );
                if (this.tokenService.getSecretKey(tokenData) === this.tokenService.getSecretKey(object)) {
                    object = await this.usersRepository.save(object);
                    return { user: object, token: this.tokenService.sign(object) }
                };
            } else {
                throw new CustomError('Invalid token');
            }
        } catch (error) {
            throw error;
        }
    }
    async login(username: string, password: string) {
        try {
            let object = await this.usersRepository.findOne({
                where: {
                    username: username
                },
                relations: ['groups', 'groups.permissions']
            });
            if (!object) {
                object = await this.usersRepository.findOne({
                    where: {
                        email: username
                    },
                    relations: ['groups', 'groups.permissions']
                });
            }
            if (!object || !object.verifyPassword(password)) {
                throw new CustomError('Wrong password');
            }
            object = await this.usersRepository.save(object);
            return { user: object, token: this.tokenService.sign(object) };
        } catch (error) {
            throw error;
        }
    }
    async register(email: string, username: string, password: string) {
        try {
            let object = new User();
            object.email = email;
            object.username = username;
            object.isActive = false;
            object.isStaff = false;
            object.isSuperuser = false;
            object.firstName = email;
            object.firstName = email;
            object.lastName = email;
            object.setPassword(password);
            object = await this.usersRepository.save(object);
            object = await this.usersRepository.findOneOrFail(
                object.id,
                { relations: ['groups', 'groups.permissions'] }
            );
            return { user: object, token: this.tokenService.sign(object) };
        } catch (error) {
            throw error;
        }
    }
    async update(id: number, user: User) {
        try {
            let object = await this.usersRepository.findOneOrFail(
                id,
                { relations: ['groups', 'groups.permissions'] }
            );
            object = plainToClassFromExist(object, user);
            object.setPassword(user.password);
            object = await this.usersRepository.save(object);
            return { user: object, token: this.tokenService.sign(object) };
        } catch (error) {
            throw error;
        }
    }
}