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

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128 })
    @MaxLength(128)
    @IsOptional()
    password: string;

    @UpdateDateColumn({ name: 'last_login', nullable: true })
    lastLogin: Date;

    @Column({ name: 'is_superuser' })
    @IsNotEmpty()
    isSuperuser: boolean;

    @Column({ length: 150, unique: true })
    @IsNotEmpty()
    @MaxLength(150)
    username: string;

    @Column({ name: 'first_name', length: 30 })
    @IsNotEmpty()
    @MaxLength(30)
    firstName: string;

    @Column({ name: 'last_name', length: 30 })
    @IsNotEmpty()
    @MaxLength(30)
    lastName: string;

    @Column({ length: 254 })
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(254)
    email: string;

    @Column({ name: 'is_staff' })
    @IsNotEmpty()
    isStaff: boolean;

    @Column({ name: 'is_active' })
    @IsNotEmpty()
    isActive: boolean;

    @CreateDateColumn({ name: 'date_joined' })
    dateJoined: Date;

    @Column({ type: Date, name: 'date_of_birth', nullable: true })
    dateOfBirth: Date;

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
        } else {
            this.password = undefined;
        }
    }

    checkPermissions(permissions: string[]) {
        permissions = permissions.map(permission => permission.toLowerCase());
        return this.groups.filter(group =>
            group.permissions.filter(permission =>
                permissions.indexOf(permission.name.toLowerCase()) !== -1
            ).length > 0
        ).length > 0
    }
}