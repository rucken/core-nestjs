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
import { ContentType } from '../entities/content-type.entity';
import { Group } from '../entities/group.entity';
import { CustomValidationError } from '../exceptions/custom-validation.error';

@Entity()
export class Permission {
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

  @ManyToOne(type => ContentType, { eager: true, nullable: true })
  @JoinColumn({ name: 'content_type_id' })
  contentType: ContentType = undefined;

  @ManyToMany(type => Group)
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
  groups: Group[];

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
