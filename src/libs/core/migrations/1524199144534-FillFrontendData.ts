import { plainToClass } from 'class-transformer';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { ContentType } from '../entities/content-type.entity';
import { Group } from '../entities/group.entity';
import { Permission } from '../entities/permission.entity';

export class FillFrontendData1524199144534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const gUser = await queryRunner.manager
      .getRepository<Group>(Group)
      .findOneOrFail({
        where: {
          name: 'user'
        },
        relations: ['permissions']
      });
    const gAdmin = await queryRunner.manager
      .getRepository<Group>(Group)
      .findOneOrFail({
        where: {
          name: 'admin'
        },
        relations: ['permissions']
      });
    const ctUser = await queryRunner.manager
      .getRepository<ContentType>(ContentType)
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
      .getRepository<Permission>(Permission)
      .save(plainToClass(Permission, permissionsObjects));
    gUser.permissions = [
      ...gUser.permissions.filter(
        permission => !permissionTitles[permission.name]
      ),
      ...permissions.filter(
        permission =>
          [
            'read_themes-page',
            'read_account-page',
            'read_profile-frame'
          ].indexOf(permission.name) !== -1
      )
    ];
    gAdmin.permissions = [
      ...gAdmin.permissions.filter(
        permission => !permissionTitles[permission.name]
      ),
      ...permissions
    ];
    const groups = await queryRunner.manager
      .getRepository<Group>(Group)
      .save(plainToClass(Group, [gUser, gAdmin]));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
