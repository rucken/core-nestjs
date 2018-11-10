import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey,
  TableColumn
} from 'typeorm';

export class Init1524197725191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
            default:
              queryRunner.connection.driver.mappedDataTypes.updateDateDefault
          },
          {
            name: 'date_joined',
            type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
            isNullable: false,
            default:
              queryRunner.connection.driver.mappedDataTypes.createDateDefault
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
      'user',
      'id',
      new TableColumn({
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      })
    );
    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USE_E',
        columnNames: ['email']
      })
    );
    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'UQ_USE_U',
        isUnique: true,
        columnNames: ['username']
      })
    );
    await queryRunner.createTable(
      new Table({
        name: 'group',
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
      'group',
      'id',
      new TableColumn({
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      })
    );
    await queryRunner.createIndex(
      'group',
      new TableIndex({
        name: 'UQ_GRO_N',
        isUnique: true,
        columnNames: ['name']
      })
    );
    await queryRunner.createIndex(
      'group',
      new TableIndex({
        name: 'UQ_GRO_T',
        isUnique: true,
        columnNames: ['title']
      })
    );
    await queryRunner.createTable(
      new Table({
        name: 'content_type',
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
      'content_type',
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
        name: 'permission',
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
      'permission',
      'id',
      new TableColumn({
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      })
    );
    await queryRunner.createForeignKey(
      'permission',
      new TableForeignKey({
        name: 'FK_PER_C_T_ID',
        columnNames: ['content_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'content_type',
        onDelete: 'CASCADE'
      })
    );
    await queryRunner.createIndex(
      'permission',
      new TableIndex({
        name: 'IDX_PER_C_T_ID',
        columnNames: ['content_type_id']
      })
    );
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
    await queryRunner.createForeignKey(
      'user_groups',
      new TableForeignKey({
        name: 'FK_USE_GRO_U_ID',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
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
        referencedTableName: 'group',
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
    await queryRunner.createForeignKey(
      'group_permissions',
      new TableForeignKey({
        name: 'FK_GRO_PER_G_ID',
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'group',
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
        referencedTableName: 'permission',
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

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
