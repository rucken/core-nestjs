import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { GroupsService, User } from '@rucken/core-nestjs';
import { plainToClass } from 'class-transformer';
import { Strategy } from 'passport-jwt';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly tokenService: TokenService,
    private readonly groupsService: GroupsService
  ) {
    super(
      {
        passReqToCallback: true,
        jwtFromRequest: (req) => {
          const token = this.tokenService.extractTokenFromRequest(req);
          return token;
        },
        secretOrKeyProvider: (req, token, done) => {
          const secretKey = this.tokenService.createSecretKey(
            plainToClass(
              User,
              this.tokenService.decode(token)
            )
          );
          done(null, secretKey);
        }
      }
    );
  }
  public async validate(req, payload: IJwtPayload, done) {
    Logger.log(JSON.stringify(payload), JwtStrategy.name);
    try {
      await this.groupsService.preloadAll();
    } catch (error) {
      throw new BadRequestException('Error in load groups');
    }
    try {
      // const { user } = await this.userService.findById({ id: payload.id });
      const user = plainToClass(User, payload);
      user.groups = user.groups.map(group =>
        this.groupsService.getGroupByName({ name: group.name })
      );
      done(null, user);
    } catch (error) {
      return done(new UnauthorizedException(), false);
    }
  }
}