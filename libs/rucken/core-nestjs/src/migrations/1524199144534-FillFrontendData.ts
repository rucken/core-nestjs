import { plainToClass } from 'class-transformer';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { ContentType1524199022084 } from '../migrations_entities/1524199022084/content-type.entity';
import { Group1524199022084 } from '../migrations_entities/1524199022084/group.entity';
import { Permission1524199022084 } from '../migrations_entities/1524199022084/permission.entity';

export class FillFrontendData1524199144534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const gUser = await queryRunner.manager.getRepository<Group1524199022084>(Group1524199022084).findOneOrFail({
      where: {
        name: 'user'
      },
      relations: ['permissions']
    });
    const gAdmin = await queryRunner.manager.getRepository<Group1524199022084>(Group1524199022084).findOneOrFail({
      where: {
        name: 'admin'
      },
      relations: ['permissions']
    });
    const ctUser = await queryRunner.manager
      .getRepository<ContentType1524199022084>(ContentType1524199022084)
      .findOneOrFail({
        where: {
          name: 'user'
        }
      });
    const permissionTitles = {
      'read_themes-page': 'Can read themes page',
      'read_account-page': 'Can read account page',
      'read_profile-frame': 'Can read profile frame',
      'read_admin-page': 'Can read admin page',
      'read_groups-frame': 'Can read groups frame',
      'read_users-frame': 'Can read users frame'
    };
    const permissionsObjects = [];
    for (const permissionTitle in permissionTitles) {
      if (permissionTitles.hasOwnProperty(permissionTitle)) {
        permissionsObjects.push({
          title: permissionTitles[permissionTitle],
          name: permissionTitle,
          contentType: ctUser
        });
      }
    }
    const permissions = await queryRunner.manager
      .getRepository<Permission1524199022084>(Permission1524199022084)
      .save(plainToClass(Permission1524199022084, permissionsObjects));
    gUser.permissions = [
      ...gUser.permissions.filter(permission => !permissionTitles[permission.name]),
      ...permissions.filter(
        permission => ['read_themes-page', 'read_account-page', 'read_profile-frame'].indexOf(permission.name) !== -1
      )
    ];
    gAdmin.permissions = [
      ...gAdmin.permissions.filter(permission => !permissionTitles[permission.name]),
      ...permissions
    ];
    const groups = await queryRunner.manager
      .getRepository<Group1524199022084>(Group1524199022084)
      .save(plainToClass(Group1524199022084, [gUser, gAdmin]));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
