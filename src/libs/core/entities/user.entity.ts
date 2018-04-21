import { IsEmail, IsNotEmpty, IsOptional, MaxLength, validateSync } from 'class-validator';
import * as hashers from 'node-django-hashers';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Group } from './group.entity';
import { CustomValidationError } from '../exceptions/custom-validation.error';
import { Transform } from 'class-transformer';
import { transformToBoolean } from '../utils/custom-transforms';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number = undefined;

    @Column({ length: 128 })
    @MaxLength(128)
    @IsOptional()
    password: string = undefined;

    @UpdateDateColumn({ name: 'last_login', nullable: true })
    lastLogin: Date = undefined;

    @Column({ name: 'is_superuser', default: false })
    isSuperuser: boolean = undefined;

    @Column({ length: 150, unique: true })
    @IsNotEmpty()
    @MaxLength(150)
    username: string = undefined;

    @Column({ name: 'first_name', length: 30 })
    @IsNotEmpty()
    @MaxLength(30)
    firstName: string = undefined;

    @Column({ name: 'last_name', length: 30 })
    @IsNotEmpty()
    @MaxLength(30)
    lastName: string = undefined;

    @Column({ length: 254 })
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(254)
    email: string = undefined;

    @Column({ name: 'is_staff', default: false })
    isStaff: boolean = undefined;

    @Column({ name: 'is_active', default: false })
    isActive: boolean = undefined;

    @CreateDateColumn({ name: 'date_joined' })
    dateJoined: Date = undefined;

    @Column({ type: Date, name: 'date_of_birth', nullable: true })
    dateOfBirth: Date = undefined;

    @ManyToMany(type => Group, {
        cascade: ['remove']
    })
    @JoinTable({
        //not work on run cli migration: 
        name: 'user_groups',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'group_id',
            referencedColumnName: 'id'
        }
    })
    groups: Group[];

    @BeforeInsert()
    doBeforeInsertion() {
        const errors = validateSync(this, { validationError: { target: false } });
        if (errors.length > 0) {
            throw new CustomValidationError(errors)
        }
    }

    @BeforeUpdate()
    doBeforeUpdate() {
        const errors = validateSync(this, { validationError: { target: false } });
        if (errors.length > 0) {
            throw new CustomValidationError(errors)
        }
    }

    makePassword(password: string) {
        var h = new hashers.PBKDF2PasswordHasher();
        var hash = h.encode(password, h.salt());
        return hash;
    }

    verifyPassword(password: string) {
        var h = new hashers.PBKDF2PasswordHasher();
        return h.verify(password, this.password);
    }

    setPassword(password: string) {
        if (password) {
            this.password = this.makePassword(password);
        }
        return this;
    }

    checkPermissions(permissions: string[]) {
        permissions = permissions.map(permission => permission.toLowerCase());
        return this.groups.filter(group =>
            group && group.permissions.filter(permission =>
                permissions.indexOf(permission.name.toLowerCase()) !== -1
            ).length > 0
        ).length > 0
    }
}