import { IsNotEmpty, MaxLength, validateSync } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { CustomValidationError } from '../../exceptions/custom-validation.error';
import { ContentType1524199022084 } from './content-type.entity';
import { Group1524199022084 } from './group.entity';

@Entity({ name: 'permissions' })
export class Permission1524199022084 {
  @PrimaryGeneratedColumn()
  id: number = undefined;

  @Column({ length: 100 })
  @IsNotEmpty()
  @MaxLength(100)
  name: string = undefined;

  @Column({ length: 255 })
  @IsNotEmpty()
  @MaxLength(255)
  title: string = undefined;

  @ManyToOne(type => ContentType1524199022084, { eager: true, nullable: true })
  @JoinColumn({ name: 'content_type_id' })
  contentType: ContentType1524199022084 = undefined;

  @ManyToMany(type => Group1524199022084)
  @JoinTable({
    // not work on run cli migration:
    name: 'group_permissions',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id'
    }
  })
  groups: Group1524199022084[];

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
