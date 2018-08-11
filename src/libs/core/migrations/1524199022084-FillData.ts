import { plainToClass } from 'class-transformer';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { ContentType } from '../entities/content-type.entity';
import { Group } from '../entities/group.entity';
import { Permission } from '../entities/permission.entity';
import { User } from '../entities/user.entity';

export class FillData1524199022084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const ctPermission = await queryRunner.manager
      .getRepository<ContentType>(ContentType)
      .save(
        plainToClass(ContentType, { name: 'permission', title: 'Permission' })
      );
    const ctGroup = await queryRunner.manager
      .getRepository<ContentType>(ContentType)
      .save(plainToClass(ContentType, { name: 'group', title: 'Group' }));
    const ctContentTtype = await queryRunner.manager
      .getRepository<ContentType>(ContentType)
      .save(
        plainToClass(ContentType, {
          name: 'content-type',
          title: 'Content type'
        })
      );
    const ctUser = await queryRunner.manager
      .getRepository<ContentType>(ContentType)
      .save(plainToClass(ContentType, { name: 'user', title: 'User' }));
    const pPermissions = await queryRunner.manager
      .getRepository<Permission>(Permission)
      .save(
        plainToClass(Permission, [
          {
            title: 'Can add permission',
            name: 'add_permission',
            contentType: ctPermission
          },
          {
            title: 'Can change permission',
            name: 'change_permission',
            contentType: ctPermission
          },
          {
            title: 'Can delete permission',
            name: 'delete_permission',
            contentType: ctPermission
          },
          {
            title: 'Can add group',
            name: 'add_group',
            contentType: ctGroup
          },
          {
            title: 'Can change group',
            name: 'change_group',
            contentType: ctGroup
          },
          {
            title: 'Can delete group',
            name: 'delete_group',
            contentType: ctGroup
          },
          {
            title: 'Can add content type',
            name: 'add_content-type',
            contentType: ctContentTtype
          },
          {
            title: 'Can change content type',
            name: 'change_content-type',
            contentType: ctContentTtype
          },
          {
            title: 'Can delete content type',
            name: 'delete_content-type',
            contentType: ctContentTtype
          },
          {
            title: 'Can add user',
            name: 'add_user',
            contentType: ctUser
          },
          {
            title: 'Can change user',
            name: 'change_user',
            contentType: ctUser
          },
          {
            title: 'Can delete user',
            name: 'delete_user',
            contentType: ctUser
          },
          {
            title: 'Can read user',
            name: 'read_user',
            contentType: ctUser
          },
          {
            title: 'Can read group',
            name: 'read_group',
            contentType: ctGroup
          },
          {
            title: 'Can read permission',
            name: 'read_permission',
            contentType: ctPermission
          },
          {
            title: 'Can read content type',
            name: 'read_content-type',
            contentType: ctContentTtype
          },
          {
            title: 'Can change profile',
            name: 'change_profile',
            contentType: ctUser
          }
        ])
      );
    const gUser = await queryRunner.manager.getRepository<Group>(Group).save(
      plainToClass(Group, {
        name: 'user',
        title: 'User',
        permissions: pPermissions.filter(item => item.name === 'change_profile')
      })
    );
    const gAdmin = await queryRunner.manager.getRepository<Group>(Group).save(
      plainToClass(Group, {
        name: 'admin',
        title: 'Admin',
        permissions: pPermissions
      })
    );
    const tempUser = new User();
    const uUsers = await queryRunner.manager.getRepository<User>(User).save(
      plainToClass(User, [
        {
          username: 'admin',
          email: 'admin@admin.com',
          password: await tempUser.createPassword('12345678'),
          firstName: 'AdminFirstName',
          lastName: 'AdminLastName',
          isSuperuser: false,
          isStaff: false,
          isActive: true,
          groups: [gAdmin]
        },
        {
          username: 'user1',
          email: 'user1@user1.com',
          password: await tempUser.createPassword('12345678'),
          firstName: 'User1FirstName',
          lastName: 'User1LastName',
          isSuperuser: false,
          isStaff: false,
          isActive: true,
          groups: [gUser]
        },
        {
          username: 'user2',
          email: 'user2@user2.com',
          password: await tempUser.createPassword('12345678'),
          firstName: 'User2FirstName',
          lastName: 'User2LastName',
          isSuperuser: false,
          isStaff: false,
          isActive: true,
          groups: [gUser]
        }
      ])
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
