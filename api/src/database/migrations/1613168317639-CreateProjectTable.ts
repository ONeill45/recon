import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProjectTable1613168317639 implements MigrationInterface {
  name = 'CreateProjectTable1613168317639'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // eslint-disable-next-line quotes
      "CREATE TYPE \"public\".\"project_project_type_enum\" AS ENUM('hourly', 'fixed bid', 'internal')",
    )
    await queryRunner.query(
      'CREATE TABLE "public"."project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_name" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP, "project_type" "public"."project_project_type_enum" NOT NULL, "confidence" integer NOT NULL, "priority" integer NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying NOT NULL, "deleted_date" TIMESTAMP, "deleted_by" character varying, "client_id" uuid, CONSTRAINT "PK_f648594d8d54cf65d99b2c10fa5" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."project" ADD CONSTRAINT "FK_2e4177062fc5a19d1d030281285" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."project" DROP CONSTRAINT "FK_2e4177062fc5a19d1d030281285"',
    )
    await queryRunner.query('DROP TABLE "public"."project"')
    await queryRunner.query('DROP TYPE "public"."project_project_type_enum"')
  }
}
