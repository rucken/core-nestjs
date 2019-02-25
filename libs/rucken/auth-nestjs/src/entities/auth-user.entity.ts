import { User } from '@rucken/core-nestjs';
import { Entity, OneToMany } from 'typeorm';
import { OauthTokensAccesstoken } from './oauth-tokens-accesstoken.entity';

@Entity({ name: 'user' })
export class AuthUser extends User {
  @OneToMany(type => OauthTokensAccesstoken, token => token.user)
  oauthTokensAccesstokens?: OauthTokensAccesstoken[];
}
