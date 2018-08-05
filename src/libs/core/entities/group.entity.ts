import { IsNotEmpty, MaxLength, validateSync } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { User } from '../entities/user.entity';
import { CustomValidationError } from '../exceptions/custom-validation.error';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number = undefined;

  @Column({ length: 100, unique: true })
  @IsNotEmpty()
  @MaxLength(100)
  name: string = undefined;

  @Column({ length: 255, unique: true })
  @IsNotEmpty()
  @MaxLength(255)
  title: string = undefined;

  @ManyToMany(type => Permission, {
    cascade: ['remove']
  })
  @JoinTable({
    // not work on run cli migration:
    name: 'group_permissions',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id'
    }
  })
  permissions: Permission[];

  @ManyToMany(type => User)
  @JoinTable({
    // not work on run cli migration:
    name: 'user_groups',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  users: User[];

  @BeforeInsert()
  doBeforeInsertion() {
    const errors = validateSync(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }

  @BeforeUpdate()
  doBeforeUpdate() {
    const errors = validateSync(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }
}
