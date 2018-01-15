import { AccountController } from './account.controller';
import { ContentTypesController } from './content-types.controller';
import { GroupsController } from './groups.controller';
import { PermissionsController } from './permissions.controller';
import { UsersController } from './users.controller';

export const controllers = [
    AccountController,
    ContentTypesController,
    PermissionsController,
    UsersController,
    GroupsController
]