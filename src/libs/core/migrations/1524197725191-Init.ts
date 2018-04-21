import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1524197725191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar(128) NOT NULL, "last_login" datetime DEFAULT (datetime('now')), "is_superuser" boolean NOT NULL, "username" varchar(150) NOT NULL, "first_name" varchar(30) NOT NULL, "last_name" varchar(30) NOT NULL, "email" varchar(254) NOT NULL, "is_staff" boolean NOT NULL, "is_active" boolean NOT NULL, "date_joined" datetime NOT NULL DEFAULT (datetime('now')), "date_of_birth" datetime, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, CONSTRAINT "UQ_8a45300fd825918f3b40195fbdc" UNIQUE ("name"), CONSTRAINT "UQ_326ae60c2267f5780f1ecc09fac" UNIQUE ("title"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, "content_type_id" integer)`);
        await queryRunner.query(`CREATE TABLE "content_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user_groups" ("user_id" integer NOT NULL, "group_id" integer NOT NULL, PRIMARY KEY ("user_id", "group_id"))`);
        await queryRunner.query(`CREATE TABLE "group_permissions" ("group_id" integer NOT NULL, "permission_id" integer NOT NULL, PRIMARY KEY ("group_id", "permission_id"))`);
        await queryRunner.query(`CREATE TABLE "temporary_permission" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, "content_type_id" integer, CONSTRAINT "FK_cc841779d8a08db653e6480a07a" FOREIGN KEY ("content_type_id") REFERENCES "content_type" ("id"))`);
        await queryRunner.query(`INSERT INTO "temporary_permission"("id", "name", "title", "content_type_id") SELECT "id", "name", "title", "content_type_id" FROM "permission"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`ALTER TABLE "temporary_permission" RENAME TO "permission"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_groups" ("user_id" integer NOT NULL, "group_id" integer NOT NULL, CONSTRAINT "FK_95bf94c61795df25a5154350102" FOREIGN KEY ("user_id") REFERENCES "user" ("id"), CONSTRAINT "FK_4c5f2c23c34f3921fbad2cd3940" FOREIGN KEY ("group_id") REFERENCES "group" ("id"), PRIMARY KEY ("user_id", "group_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_groups"("user_id", "group_id") SELECT "user_id", "group_id" FROM "user_groups"`);
        await queryRunner.query(`DROP TABLE "user_groups"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_groups" RENAME TO "user_groups"`);
        await queryRunner.query(`CREATE TABLE "temporary_group_permissions" ("group_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "FK_3924be6485a5b5d0d2fe1a94c08" FOREIGN KEY ("group_id") REFERENCES "group" ("id"), CONSTRAINT "FK_7514fdc446a1fdcf5b2d39cda60" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id"), PRIMARY KEY ("group_id", "permission_id"))`);
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
        await queryRunner.query(`ALTER TABLE "permission" RENAME TO "temporary_permission"`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, "content_type_id" integer)`);
        await queryRunner.query(`INSERT INTO "permission"("id", "name", "title", "content_type_id") SELECT "id", "name", "title", "content_type_id" FROM "temporary_permission"`);
        await queryRunner.query(`DROP TABLE "temporary_permission"`);
        await queryRunner.query(`DROP TABLE "group_permissions"`);
        await queryRunner.query(`DROP TABLE "user_groups"`);
        await queryRunner.query(`DROP TABLE "content_type"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
