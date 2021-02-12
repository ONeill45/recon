import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProjectTable1613073577286 implements MigrationInterface {
  name = 'CreateProjectTable1613073577286'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // eslint-disable-next-line quotes
      "CREATE TYPE \"public\".\"project_project_type_enum\" AS ENUM('hourly', 'fixed bid', 'internal')",
    )
    await queryRunner.query(
      'CREATE TABLE "public"."project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_name" character varying NOT NULL, "client_id" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP, "project_type" "public"."project_project_type_enum" NOT NULL, "confidence" integer NOT NULL, "priority" integer NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying NOT NULL, "deleted_date" TIMESTAMP, "deleted_by" character varying, CONSTRAINT "PK_f648594d8d54cf65d99b2c10fa5" PRIMARY KEY ("id"))',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "public"."project"')
    await queryRunner.query('DROP TYPE "public"."project_project_type_enum"')
  }
}
