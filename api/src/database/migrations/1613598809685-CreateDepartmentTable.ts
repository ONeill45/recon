import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateDepartmentTable1613598809685 implements MigrationInterface {
  name = 'CreateDepartmentTable1613598809685'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"department_name_enum\" AS ENUM('Data Analytics', 'Design', 'Development Services', 'Development Operations', 'Project Management', 'Quality Assurance')",
    )
    await queryRunner.query(
      'CREATE TABLE "public"."department" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."department_name_enum" NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying NOT NULL, "deleted_date" TIMESTAMP, "deleted_by" character varying, CONSTRAINT "PK_58d261117d7d8ccd61e5948f5f8" PRIMARY KEY ("id"))',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "public"."department"')
    await queryRunner.query('DROP TYPE "public"."department_name_enum"')
  }
}
