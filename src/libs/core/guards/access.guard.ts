import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { IncomingMessage } from 'http';

import { User } from '../entities/user.entity';
import { GroupsService } from '../services/groups.service';
import { TokenService } from '../services/token.service';

@Guard()
export class AccessGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly tokenService: TokenService,
        private readonly groupsService: GroupsService
    ) {
        //workaround
        this.groupsService.loadAll();
    }

    canActivate(req: IncomingMessage, context: ExecutionContext): boolean {
        const { parent, handler } = context;
        const authorizationHeader = req.headers['authorization'] ?
            String(req.headers['authorization']) : null;
        if (authorizationHeader && authorizationHeader.indexOf(process.env.JWT_AUTH_HEADER_PREFIX) === 0) {
            let token =
                process.env.JWT_AUTH_HEADER_PREFIX ?
                    authorizationHeader.split(process.env.JWT_AUTH_HEADER_PREFIX)[1] :
                    authorizationHeader;
            token = token.trim();
            if (token && this.tokenService.verify(token)) {
                const data: any = this.tokenService.decode(token);
                req['user'] = plainToClass(User, data);
                req['user'].groups = data.groups.map(group =>
                    this.groupsService.getGroupByName(group.name)
                );
            }
        }
        const roles = this.reflector.get<string[]>('roles', handler);
        const permissions = this.reflector.get<string[]>('permissions', handler);

        const hasRole = roles ? roles.filter(roleName =>
            req['user'] &&
            req['user'][roleName]
        ).length > 0 : null;

        const hasPermission = permissions ?
            req['user'] &&
            req['user'] instanceof User &&
            req['user'].checkPermissions(permissions) : null;
        return hasRole === true || hasPermission === true || (hasRole === null && hasPermission === null);
    }
}