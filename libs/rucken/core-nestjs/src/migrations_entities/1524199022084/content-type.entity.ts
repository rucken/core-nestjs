import { IsNotEmpty, MaxLength, validateSync } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomValidationError } from '../../exceptions/custom-validation.error';
import { Permission1524199022084 } from './permission.entity';

@Entity({ name: 'content_types' })
export class ContentType1524199022084 {
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

  @OneToMany(type => Permission1524199022084, permission => permission.contentType)
  permissions: Permission1524199022084[];

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
