import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOauthTokensAccesstokenTable1533216209291 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "oauth_tokens_accesstoken" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime('now')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200) NOT NULL, "expires_at" datetime, "token_type" varchar(200) NOT NULL, "scope" varchar(512) NOT NULL, "user_id" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_oauth_tokens_accesstoken" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime('now')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200) NOT NULL, "expires_at" datetime, "token_type" varchar(200) NOT NULL, "scope" varchar(512) NOT NULL, "user_id" integer, CONSTRAINT "FK_3f41e1df874996c2ff343522bdd" FOREIGN KEY ("user_id") REFERENCES "user" ("id"))`);
        await queryRunner.query(`INSERT INTO "temporary_oauth_tokens_accesstoken"("id", "provider", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id") SELECT "id", "provider", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id" FROM "oauth_tokens_accesstoken"`);
        await queryRunner.query(`DROP TABLE "oauth_tokens_accesstoken"`);
        await queryRunner.query(`ALTER TABLE "temporary_oauth_tokens_accesstoken" RENAME TO "oauth_tokens_accesstoken"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "oauth_tokens_accesstoken" RENAME TO "temporary_oauth_tokens_accesstoken"`);
        await queryRunner.query(`CREATE TABLE "oauth_tokens_accesstoken" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime('now')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200) NOT NULL, "expires_at" datetime, "token_type" varchar(200) NOT NULL, "scope" varchar(512) NOT NULL, "user_id" integer)`);
        await queryRunner.query(`INSERT INTO "oauth_tokens_accesstoken"("id", "provider", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id") SELECT "id", "provider", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id" FROM "temporary_oauth_tokens_accesstoken"`);
        await queryRunner.query(`DROP TABLE "temporary_oauth_tokens_accesstoken"`);
        await queryRunner.query(`DROP TABLE "oauth_tokens_accesstoken"`);
    }

}
