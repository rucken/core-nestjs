import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddOauthTokensAccesstokenTable1533634559617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'oauth_tokens_accesstokens',
        columns: [
          {
            name: 'id',
            type: 'integer'
          },
          {
            name: 'provider',
            type: 'varchar(20)',
            isNullable: false
          },
          {
            name: 'provider_client_id',
            type: 'varchar(200)',
            isNullable: false
          },
          {
            name: 'granted_at',
            type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
            isNullable: false,
            default: queryRunner.connection.driver.mappedDataTypes.createDateDefault
          },
          {
            name: 'access_token',
            type: 'varchar(500)',
            isNullable: false
          },
          {
            name: 'refresh_token',
            type: 'varchar(500)'
          },
          {
            name: 'expires_at',
            type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
            isNullable: true
          },
          {
            name: 'token_type',
            type: 'varchar(200)'
          },
          {
            name: 'scope',
            type: 'varchar(512)'
          },
          {
            name: 'user_id',
            type: 'integer'
          }
        ]
      }),
      true
    );

    await queryRunner.changeColumn(
      'oauth_tokens_accesstokens',
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
        'oauth_tokens_accesstokens',
        new TableForeignKey({
          name: 'FK_TOK_ACC_U_ID',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createIndex(
        'oauth_tokens_accesstokens',
        new TableIndex({
          name: 'IDX_TOK_ACC_U_ID',
          columnNames: ['user_id']
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
