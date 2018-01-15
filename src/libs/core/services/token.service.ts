import { decode, sign, verify } from 'jsonwebtoken';
import { Component } from '@nestjs/common';

@Component()
export class TokenService {
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
                expiresIn: process.env.JWT_EXPIRATION_DELTA
            }
        )
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
        )
    }
    getSecretKey(data: any) {
        return process.env.SECRET_KEY +
            (data ? (
                '$' + data.id +
                '$' + data.isStaff +
                '$' + data.isActive +
                '$' + data.isSuperuser +
                (data.groups ? data.groups.map(group => '$' + group.name) : '')
            ) : '');
    }
}