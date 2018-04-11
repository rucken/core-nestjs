import { AccountService } from './account.service';
import { GroupsService } from './groups.service';
import { TokenService } from './token.service';
import { UsersService } from './users.service';
import { ContentTypesService } from './content-types.service';
import { PermissionsService } from './permissions.service';

export const services = [
    TokenService,
    AccountService,
    GroupsService,
    UsersService,
    ContentTypesService,
    PermissionsService
]