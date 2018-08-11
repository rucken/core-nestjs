import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1524197725191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar(128) NOT NULL, "last_login" datetime DEFAULT (datetime('now')), "is_superuser" boolean NOT NULL, "username" varchar(150) NOT NULL, "first_name" varchar(30) NOT NULL, "last_name" varchar(30) NOT NULL, "email" varchar(254) NOT NULL, "is_staff" boolean NOT NULL, "is_active" boolean NOT NULL, "date_joined" datetime NOT NULL DEFAULT (datetime('now')), "date_of_birth" datetime, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`
    );
    await queryRunner.query(
      `CREATE TABLE "group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, CONSTRAINT "UQ_8a45300fd825918f3b40195fbdc" UNIQUE ("name"), CONSTRAINT "UQ_326ae60c2267f5780f1ecc09fac" UNIQUE ("title"))`
    );
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL, "content_type_id" integer)`
    );
    await queryRunner.query(
      `CREATE TABLE "content_type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "title" varchar(255) NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "user_groups" ("user_id" integer NOT NULL, "group_id" integer NOT NULL, PRIMARY KEY ("user_id", "group_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "group_permissions" ("group_id" integer NOT NULL, "permission_id" integer NOT NULL, PRIMARY KEY ("group_id", "permission_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
