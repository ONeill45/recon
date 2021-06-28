import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddSkillsTables1617639815498 implements MigrationInterface {
  name = 'AddSkillsTables1617639815498'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "public"."skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "skill_name" character varying NOT NULL, "category_id" uuid, CONSTRAINT "PK_360e4142eb3e858a65771cc9b96" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "public"."project_skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "skill_value" integer NOT NULL, "project_id" uuid, "skill_id" uuid, CONSTRAINT "PK_2104f31fbd7f6fb49d415611cea" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'CREATE TABLE "public"."resource_skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "skill_value" integer NOT NULL, "resource_id" uuid, "skill_id" uuid, CONSTRAINT "PK_50a624eeb0bf7de6715c9babaf6" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      // eslint-disable-next-line quotes
      "CREATE TYPE \"public\".\"skill_category_skill_category_name_enum\" AS ENUM('Technical', 'Relationship', 'Communication', 'Leadership', 'Analytical')",
    )
    await queryRunner.query(
      'CREATE TABLE "public"."skill_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "skill_category_name" "public"."skill_category_skill_category_name_enum" NOT NULL, CONSTRAINT "PK_f1490cf530c0fc410b08660380f" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ALTER COLUMN "email" SET NOT NULL',
    )
    await queryRunner.query(
      'COMMENT ON COLUMN "public"."resource"."email" IS NULL',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."skill" ADD CONSTRAINT "FK_f1490cf530c0fc410b08660380f" FOREIGN KEY ("category_id") REFERENCES "public"."skill_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."project_skill" ADD CONSTRAINT "FK_0a433e569457a11c96ad03ca8cf" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."project_skill" ADD CONSTRAINT "FK_ae304f4979c60fedce64e11f91a" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource_skill" ADD CONSTRAINT "FK_ef3b8438ce3f170c4539c1c55ce" FOREIGN KEY ("resource_id") REFERENCES "public"."resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource_skill" ADD CONSTRAINT "FK_b780f8c3a17fddea997b3d5e90e" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."resource_skill" DROP CONSTRAINT "FK_b780f8c3a17fddea997b3d5e90e"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource_skill" DROP CONSTRAINT "FK_ef3b8438ce3f170c4539c1c55ce"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."project_skill" DROP CONSTRAINT "FK_ae304f4979c60fedce64e11f91a"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."project_skill" DROP CONSTRAINT "FK_0a433e569457a11c96ad03ca8cf"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."skill" DROP CONSTRAINT "FK_f1490cf530c0fc410b08660380f"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."project" DROP COLUMN "priority"',
    )
    await queryRunner.query(
      'COMMENT ON COLUMN "public"."resource"."email" IS NULL',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ALTER COLUMN "email" DROP NOT NULL',
    )
    await queryRunner.query('DROP TABLE "public"."skill_category"')
    await queryRunner.query(
      'DROP TYPE "public"."skill_category_skill_category_name_enum"',
    )
    await queryRunner.query('DROP TABLE "public"."resource_skill"')
    await queryRunner.query('DROP TABLE "public"."project_skill"')
    await queryRunner.query('DROP TABLE "public"."skill"')
  }
}
