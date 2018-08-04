import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultValueForBooleanFields1524322965692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_user_groups" ("user_id" integer NOT NULL, "group_id" integer NOT NULL, PRIMARY KEY ("user_id", "group_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_groups"("user_id", "group_id") SELECT "user_id", "group_id" FROM "user_groups"`);
        await queryRunner.query(`DROP TABLE "user_groups"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_groups" RENAME TO "user_groups"`);
        await queryRunner.query(`CREATE TABLE "temporary_group_permissions" ("group_id" integer NOT NULL, "permission_id" integer NOT NULL, PRIMARY KEY ("group_id", "permission_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_group_permissions"("group_id", "permission_id") SELECT "group_id", "permission_id" FROM "group_permissions"`);
        await queryRunner.query(`DROP TABLE "group_permissions"`);
        await queryRunner.query(`ALTER TABLE "temporary_group_permissions" RENAME TO "group_permissions"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar(128) NOT NULL, "last_login" datetime DEFAULT (datetime('now')), "is_superuser" boolean NOT NULL DEFAULT (0), "username" varchar(150), "first_name" varchar(30), "last_name" varchar(30), "email" varchar(254) NOT NULL, "is_staff" boolean NOT NULL DEFAULT (0), "is_active" boolean NOT NULL DEFAULT (0), "date_joined" datetime NOT NULL DEFAULT (datetime('now')), "date_of_birth" datetime, CONSTRAINT "UQ_USER_USERNAME" UNIQUE ("username"), CONSTRAINT "UQ_USER_EMAIL" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "password", "last_login", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined", "date_of_birth") SELECT "id", "password", "last_login", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined", "date_of_birth" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_groups" ("user_id" integer NOT NULL, "group_id" integer NOT NULL, CONSTRAINT "FK_95bf94c61795df25a5154350102" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE, CONSTRAINT "FK_4c5f2c23c34f3921fbad2cd3940" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE CASCADE, PRIMARY KEY ("user_id", "group_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_groups"("user_id", "group_id") SELECT "user_id", "group_id" FROM "user_groups"`);
        await queryRunner.query(`DROP TABLE "user_groups"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_groups" RENAME TO "user_groups"`);
        await queryRunner.query(`CREATE TABLE "temporary_group_permissions" ("group_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "FK_3924be6485a5b5d0d2fe1a94c08" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE CASCADE, CONSTRAINT "FK_7514fdc446a1fdcf5b2d39cda60" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id") ON DELETE CASCADE, PRIMARY KEY ("group_id", "permission_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_group_permissions"("group_id", "permission_id") SELECT "group_id", "permission_id" FROM "group_permissions"`);
        await queryRunner.query(`DROP TABLE "group_permissions"`);
        await queryRunner.query(`ALTER TABLE "temporary_group_permissions" RENAME TO "group_permissions"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "group_permissions" RENAME TO "temporary_group_permissions"`);
        await queryRunner.query(`CREATE TABLE "group_permissions" ("group_id" integer NOT NULL, "permission_id" integer NOT NULL, PRIMARY KEY ("group_id", "permission_id"))`);
        await queryRunner.query(`INSERT INTO "group_permissions"("group_id", "permission_id") SELECT "group_id", "permission_id" FROM "temporary_group_permissions"`);
        await queryRunner.query(`DROP TABLE "temporary_group_permissions"`);
        await queryRunner.query(`ALTER TABLE "user_groups" RENAME TO "temporary_user_groups"`);
        await queryRunner.query(`CREATE TABLE "user_groups" ("user_id" integer NOT NULL, "group_id" integer NOT NULL, PRIMARY KEY ("user_id", "group_id"))`);
        await queryRunner.query(`INSERT INTO "user_groups"("user_id", "group_id") SELECT "user_id", "group_id" FROM "temporary_user_groups"`);
        await queryRunner.query(`DROP TABLE "temporary_user_groups"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar(128) NOT NULL, "last_login" datetime DEFAULT (datetime('now')), "is_superuser" boolean NOT NULL, "username" varchar(150) NOT NULL, "first_name" varchar(30) NOT NULL, "last_name" varchar(30) NOT NULL, "email" varchar(254) NOT NULL, "is_staff" boolean NOT NULL, "is_active" boolean NOT NULL, "date_joined" datetime NOT NULL DEFAULT (datetime('now')), "date_of_birth" datetime, CONSTRAINT "UQ_USER_USERNAME" UNIQUE ("username"), CONSTRAINT "UQ_USER_EMAIL" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "password", "last_login", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined", "date_of_birth") SELECT "id", "password", "last_login", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined", "date_of_birth" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "group_permissions" RENAME TO "temporary_group_permissions"`);
        await queryRunner.query(`CREATE TABLE "group_permissions" ("group_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "FK_7514fdc446a1fdcf5b2d39cda60" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3924be6485a5b5d0d2fe1a94c08" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("group_id", "permission_id"))`);
        await queryRunner.query(`INSERT INTO "group_permissions"("group_id", "permission_id") SELECT "group_id", "permission_id" FROM "temporary_group_permissions"`);
        await queryRunner.query(`DROP TABLE "temporary_group_permissions"`);
        await queryRunner.query(`ALTER TABLE "user_groups" RENAME TO "temporary_user_groups"`);
        await queryRunner.query(`CREATE TABLE "user_groups" ("user_id" integer NOT NULL, "group_id" integer NOT NULL, CONSTRAINT "FK_4c5f2c23c34f3921fbad2cd3940" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_95bf94c61795df25a5154350102" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("user_id", "group_id"))`);
        await queryRunner.query(`INSERT INTO "user_groups"("user_id", "group_id") SELECT "user_id", "group_id" FROM "temporary_user_groups"`);
        await queryRunner.query(`DROP TABLE "temporary_user_groups"`);
    }

}
