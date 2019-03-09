import { plainToClass } from 'class-transformer';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { ContentType1524199022084 } from '../migrations_entities/1524199022084/content-type.entity';
import { Group1524199022084 } from '../migrations_entities/1524199022084/group.entity';
import { Permission1524199022084 } from '../migrations_entities/1524199022084/permission.entity';
import { User1524199022084 } from '../migrations_entities/1524199022084/user.entity';

export class FillData1524199022084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const ctPermission = await queryRunner.manager
      .getRepository<ContentType1524199022084>(ContentType1524199022084)
      .save(plainToClass(ContentType1524199022084, { name: 'permission', title: 'Permission' }));
    const ctGroup = await queryRunner.manager
      .getRepository<ContentType1524199022084>(ContentType1524199022084)
      .save(plainToClass(ContentType1524199022084, { name: 'group', title: 'Group' }));
    const ctContentTtype = await queryRunner.manager
      .getRepository<ContentType1524199022084>(ContentType1524199022084)
      .save(
        plainToClass(ContentType1524199022084, {
          name: 'content-type',
          title: 'Content type'
        })
      );
    const ctUser = await queryRunner.manager
      .getRepository<ContentType1524199022084>(ContentType1524199022084)
      .save(plainToClass(ContentType1524199022084, { name: 'user', title: 'User' }));
    const pPermissions = await queryRunner.manager.getRepository<Permission1524199022084>(Permission1524199022084).save(
      plainToClass(Permission1524199022084, [
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
    const gUser = await queryRunner.manager.getRepository<Group1524199022084>(Group1524199022084).save(
      plainToClass(Group1524199022084, {
        name: 'user',
        title: 'User',
        permissions: pPermissions.filter(item => item.name === 'change_profile')
      })
    );
    const gAdmin = await queryRunner.manager.getRepository<Group1524199022084>(Group1524199022084).save(
      plainToClass(Group1524199022084, {
        name: 'admin',
        title: 'Admin',
        permissions: pPermissions
      })
    );
    const tempUser = new User1524199022084();
    const uUsers = await queryRunner.manager.getRepository<User1524199022084>(User1524199022084).save(
      plainToClass(User1524199022084, [
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
