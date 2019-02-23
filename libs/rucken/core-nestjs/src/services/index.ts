import { AccountService } from '../services/account.service';
import { ContentTypesService } from '../services/content-types.service';
import { GroupsService } from '../services/groups.service';
import { PermissionsService } from '../services/permissions.service';
import { UsersService } from '../services/users.service';

export const CORE_SERVICES = [AccountService, GroupsService, UsersService, ContentTypesService, PermissionsService];
