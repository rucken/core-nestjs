import { CustomValidationError, User } from '@rucken/core-nestjs';
import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  validateSync
} from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'oauth_tokens_accesstoken' })
export class OauthTokensAccesstoken {
  @PrimaryGeneratedColumn()
  id: number = undefined;

  @Column({ length: 20 })
  @IsNotEmpty()
  @MaxLength(20)
  provider: string = undefined;

  @Column({ length: 200 })
  @IsNotEmpty()
  @MaxLength(200)
  providerClientId: string = undefined;

  @CreateDateColumn({ name: 'granted_at' })
  grantedAt: Date = undefined;

  @Column({ name: 'access_token', length: 500 })
  @IsNotEmpty()
  @MaxLength(500)
  accessToken: string = undefined;

  @Column({ name: 'refresh_token', length: 200, nullable: true })
  @MaxLength(200)
  @IsOptional()
  refreshToken: string = undefined;

  @Column({ type: Date, name: 'expires_at', nullable: true })
  expiresAt: Date = undefined;

  @Column({ name: 'token_type', length: 200, nullable: true })
  @MaxLength(200)
  @IsOptional()
  tokenType: string = undefined;

  @Column({ length: 512, nullable: true })
  @MaxLength(512)
  @IsOptional()
  scope: string = undefined;

  @ManyToOne(type => User, { eager: true })
  @IsNotEmpty()
  @JoinColumn({ name: 'user_id' })
  user: User = undefined;

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
