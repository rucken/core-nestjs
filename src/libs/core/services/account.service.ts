import { Component, MethodNotAllowedException } from '@nestjs/common';
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
    async info(options: { token: string }) {
        try {
            if (this.tokenService.verify(options.token)) {
                let tokenData: any = this.tokenService.decode(options.token);
                let object = await this.usersRepository.findOneOrFail(
                    tokenData.id,
                    { relations: ['groups', 'groups.permissions'] }
                );
                if (this.tokenService.getSecretKey(tokenData) === this.tokenService.getSecretKey(object)) {
                    object = await this.usersRepository.save(object);
                    return { user: object, token: options.token }
                } else {
                    throw new CustomError('Invalid token');
                }
            }
        } catch (error) {
            throw error;
        }
    }
    async refresh(options: { token: string }) {
        try {
            if (this.tokenService.verify(options.token)) {
                let tokenData: any = this.tokenService.decode(options.token);
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
    async login(options: { username: string; password: string }) {
        try {
            let object = await this.usersRepository.findOne({
                where: {
                    username: options.username
                },
                relations: ['groups', 'groups.permissions']
            });
            if (!object) {
                object = await this.usersRepository.findOne({
                    where: {
                        email: options.username
                    },
                    relations: ['groups', 'groups.permissions']
                });
            }
            if (!object || !object.verifyPassword(options.password)) {
                throw new CustomError('Wrong password');
            }
            object = await this.usersRepository.save(object);
            return { user: object, token: this.tokenService.sign(object) };
        } catch (error) {
            throw error;
        }
    }
    async register(options: { email: string; username: string; password: string }) {
        try {
            let object = new User();
            object.email = options.email;
            object.username = options.username;
            object.isActive = false;
            object.isStaff = false;
            object.isSuperuser = false;
            object.firstName = options.email;
            object.firstName = options.email;
            object.lastName = options.email;
            object.setPassword(options.password);
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
    async update(options: { id: number; user: User }) {
        if (process.env.DEMO === 'true') {
            throw new MethodNotAllowedException('Not allowed in DEMO mode');
        }
        try {
            let object = await this.usersRepository.findOneOrFail(
                options.id,
                { relations: ['groups', 'groups.permissions'] }
            );
            object = plainToClassFromExist(object, options.user);
            object.setPassword(options.user.password);
            object = await this.usersRepository.save(object);
            return { user: object, token: this.tokenService.sign(object) };
        } catch (error) {
            throw error;
        }
    }
}