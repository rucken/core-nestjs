import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOauthTokensAccesstokenTable1533634559617
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "oauth_tokens_accesstoken" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "providerClientId" varchar(200) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime('now')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200), "expires_at" datetime, "token_type" varchar(200), "scope" varchar(512), "user_id" integer)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
