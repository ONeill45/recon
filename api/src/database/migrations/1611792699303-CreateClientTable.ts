import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateClientTable1611792699303 implements MigrationInterface {
  name = 'CreateClientTable1611792699303'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "public"."client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client_name" character varying NOT NULL, "description" character varying NOT NULL, "logo_url" character varying, "title" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying NOT NULL, "deleted_date" TIMESTAMP, "deleted_by" character varying, CONSTRAINT "PK_1d7f977dce904d4ffd68ce226bb" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ADD "created_date" TIMESTAMP NOT NULL DEFAULT now()',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ADD "created_by" character varying NOT NULL',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ADD "updated_date" TIMESTAMP NOT NULL DEFAULT now()',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ADD "updated_by" character varying NOT NULL',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ADD "deleted_date" TIMESTAMP',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ADD "deleted_by" character varying',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."resource" DROP COLUMN "deleted_by"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" DROP COLUMN "deleted_date"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" DROP COLUMN "updated_by"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" DROP COLUMN "updated_date"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" DROP COLUMN "created_by"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" DROP COLUMN "created_date"',
    )
    await queryRunner.query('DROP TABLE "public"."client"')
  }
}
