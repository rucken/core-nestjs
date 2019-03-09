import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class Init1524197725191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer'
          },
          {
            name: 'password',
            type: 'varchar(128)',
            isNullable: false
          },
          {
            name: 'is_superuser',
            type: 'boolean',
            isNullable: false
          },
          {
            name: 'is_staff',
            type: 'boolean',
            isNullable: false
          },
          {
            name: 'is_active',
            type: 'boolean',
            isNullable: false
          },
          {
            name: 'username',
            type: 'varchar(150)',
            isNullable: false
          },
          {
            name: 'first_name',
            type: 'varchar(30)',
            isNullable: true
          },
          {
            name: 'last_name',
            type: 'varchar(30)',
            isNullable: true
          },
          {
            name: 'email',
            type: 'varchar(254)',
            isNullable: false
          },
          {
            name: 'last_login',
            type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
            default: queryRunner.connection.driver.mappedDataTypes.updateDateDefault
          },
          {
            name: 'date_joined',
            type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
            isNullable: false,
            default: queryRunner.connection.driver.mappedDataTypes.createDateDefault
          },
          {
            name: 'date_of_birth',
            type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
            isNullable: true
          }
        ]
      }),
      true
    );
    await queryRunner.changeColumn(
      'users',
      'id',
      new TableColumn({
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      })
    );
    if (!(queryRunner.connection.driver as any).sqlite) {
      await queryRunner.createIndex(
        'users',
        new TableIndex({
          name: 'IDX_USE_E',
          columnNames: ['email']
        })
      );
      await queryRunner.createIndex(
        'users',
        new TableIndex({
          name: 'UQ_USE_U',
          isUnique: true,
          columnNames: ['username']
        })
      );
    }
    await queryRunner.createTable(
      new Table({
        name: 'groups',
        columns: [
          {
            name: 'id',
            type: 'integer'
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false
          },
          {
            name: 'title',
            type: 'varchar(255)',
            isNullable: false
          }
        ]
      }),
      true
    );
    await queryRunner.changeColumn(
      'groups',
      'id',
      new TableColumn({
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      })
    );
    if (!(queryRunner.connection.driver as any).sqlite) {
      await queryRunner.createIndex(
        'groups',
        new TableIndex({
          name: 'UQ_GRO_N',
          isUnique: true,
          columnNames: ['name']
        })
      );
      await queryRunner.createIndex(
        'groups',
        new TableIndex({
          name: 'UQ_GRO_T',
          isUnique: true,
          columnNames: ['title']
        })
      );
    }
    await queryRunner.createTable(
      new Table({
        name: 'content_types',
        columns: [
          {
            name: 'id',
            type: 'integer'
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false
          },
          {
            name: 'title',
            type: 'varchar(255)',
            isNullable: false
          }
        ]
      }),
      true
    );
    await queryRunner.changeColumn(
      'content_types',
      'id',
      new TableColumn({
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      })
    );
    await queryRunner.createTable(
      new Table({
        name: 'permissions',
        columns: [
          {
            name: 'id',
            type: 'integer'
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false
          },
          {
            name: 'title',
            type: 'varchar(255)',
            isNullable: false
          },
          {
            name: 'content_type_id',
            type: 'integer'
          }
        ]
      }),
      true
    );
    await queryRunner.changeColumn(
      'permissions',
      'id',
      new TableColumn({
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      })
    );
    if (!(queryRunner.connection.driver as any).sqlite) {
      await queryRunner.createForeignKey(
        'permissions',
        new TableForeignKey({
          name: 'FK_PER_C_T_ID',
          columnNames: ['content_type_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'content_types',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createIndex(
        'permissions',
        new TableIndex({
          name: 'IDX_PER_C_T_ID',
          columnNames: ['content_type_id']
        })
      );
    }
    await queryRunner.createTable(
      new Table({
        name: 'user_groups',
        columns: [
          {
            name: 'user_id',
            type: 'integer',
            isNullable: false,
            isPrimary: true
          },
          {
            name: 'group_id',
            type: 'integer',
            isNullable: false,
            isPrimary: true
          }
        ]
      }),
      true
    );
    if (!(queryRunner.connection.driver as any).sqlite) {
      await queryRunner.createForeignKey(
        'user_groups',
        new TableForeignKey({
          name: 'FK_USE_GRO_U_ID',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createIndex(
        'user_groups',
        new TableIndex({
          name: 'IDX_USE_GRO_U_ID',
          columnNames: ['user_id']
        })
      );
      await queryRunner.createForeignKey(
        'user_groups',
        new TableForeignKey({
          name: 'FK_USE_GRO_G_ID',
          columnNames: ['group_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'groups',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createIndex(
        'user_groups',
        new TableIndex({
          name: 'IDX_USE_GRO_G_ID',
          columnNames: ['group_id']
        })
      );
    }
    await queryRunner.createTable(
      new Table({
        name: 'group_permissions',
        columns: [
          {
            name: 'group_id',
            type: 'integer',
            isNullable: false,
            isPrimary: true
          },
          {
            name: 'permission_id',
            type: 'integer',
            isNullable: false,
            isPrimary: true
          }
        ]
      }),
      true
    );
    if (!(queryRunner.connection.driver as any).sqlite) {
      await queryRunner.createForeignKey(
        'group_permissions',
        new TableForeignKey({
          name: 'FK_GRO_PER_G_ID',
          columnNames: ['group_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'groups',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createIndex(
        'group_permissions',
        new TableIndex({
          name: 'IDX_GRO_PER_G_ID',
          columnNames: ['group_id']
        })
      );
      await queryRunner.createForeignKey(
        'group_permissions',
        new TableForeignKey({
          name: 'FK_GRO_PER_P_ID',
          columnNames: ['permission_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'permissions',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createIndex(
        'group_permissions',
        new TableIndex({
          name: 'IDX_GRO_PER_P_ID',
          columnNames: ['permission_id']
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
