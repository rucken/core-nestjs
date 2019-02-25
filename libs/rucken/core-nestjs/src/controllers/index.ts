import { AccountController } from '../controllers/account.controller';
import { ContentTypesController } from '../controllers/content-types.controller';
import { GroupsController } from '../controllers/groups.controller';
import { PermissionsController } from '../controllers/permissions.controller';
import { UsersController } from '../controllers/users.controller';

export const CORE_CONTROLLERS = [
  AccountController,
  ContentTypesController,
  PermissionsController,
  UsersController,
  GroupsController
];
