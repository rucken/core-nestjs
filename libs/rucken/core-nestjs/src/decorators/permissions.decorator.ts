import { ReflectMetadata } from '@nestjs/common';

export const Permissions = (...permissions: string[]) => ReflectMetadata('permissions', permissions);
