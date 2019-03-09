import { IsNotEmpty, MaxLength, validateSync } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomValidationError } from '../../exceptions/custom-validation.error';
import { Permission1524199022084 } from './permission.entity';
import { User1524199022084 } from './user.entity';

@Entity({ name: 'groups' })
export class Group1524199022084 {
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

  @ManyToMany(type => Permission1524199022084, {
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
  permissions: Permission1524199022084[];

  @ManyToMany(type => User1524199022084)
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
  users: User1524199022084[];

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
