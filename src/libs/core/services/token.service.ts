import { Inject, Injectable } from '@nestjs/common';
import { decode, sign, verify } from 'jsonwebtoken';
import { AUTH_CONFIG_TOKEN, IAuthConfig } from '../configs/auth.config';

@Injectable()
export class TokenService {
    constructor(
        @Inject(AUTH_CONFIG_TOKEN) private readonly authConfig: IAuthConfig
    ) {

    }
    sign(user: any) {
        return sign(
            {
                id: user.id,
                isStaff: user.isStaff,
                isActive: user.isActive,
                isSuperuser: user.isSuperuser,
                groups: user.groups.map(group => {
                    return { name: group.name };
                })
            },
            this.getSecretKey({
                id: user.id,
                isStaff: user.isStaff,
                isActive: user.isActive,
                isSuperuser: user.isSuperuser,
                groups: user.groups
            }),
            {
                expiresIn: this.authConfig.jwt.expirationDelta
            }
        );
    }
    verify(token: string) {
        const data: any = decode(
            token
        );
        return verify(token, this.getSecretKey(data));
    }
    decode(token: string) {
        return decode(
            token
        );
    }
    getSecretKey(data: any) {
        return this.authConfig.jwt.secretKey +
            (data ? (
                '$' + data.id +
                '$' + data.isStaff +
                '$' + data.isActive +
                '$' + data.isSuperuser +
                (data.groups ? data.groups.map(group => '$' + group.name) : '')
            ) : '');
    }
}