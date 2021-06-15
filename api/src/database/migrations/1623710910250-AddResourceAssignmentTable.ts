import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddResourceAssignmentTable1623710910250
  implements MigrationInterface {
  name = 'AddResourceAssignmentTable1623710910250'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."resource_assignment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP, "end_reason" character varying, "percentage" integer NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying NOT NULL, "deleted_date" TIMESTAMP, "deleted_by" character varying, "resource_allocation_id" uuid, "resource_id" uuid, CONSTRAINT "PK_e304bffe8a3506e876efeb0fa37" PRIMARY KEY ("id"))`,
    )
    // await queryRunner.query(
    //   `CREATE TYPE "public"."project_project_type_enum" AS ENUM('hourly', 'fixed bid', 'internal')`,
    // )
    // await queryRunner.query(
    //   `CREATE TYPE "public"."project_priority_enum" AS ENUM('High', 'Medium', 'Low')`,
    // )
    // await queryRunner.query(
    //   `CREATE TABLE "public"."project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_name" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP, "project_type" "public"."project_project_type_enum" NOT NULL, "confidence" integer NOT NULL, "priority" "public"."project_priority_enum" NOT NULL DEFAULT 'High', "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying NOT NULL, "deleted_date" TIMESTAMP, "deleted_by" character varying, "client_id" uuid, CONSTRAINT "PK_f648594d8d54cf65d99b2c10fa5" PRIMARY KEY ("id"))`,
    // )
    // await queryRunner.query(
    //   `CREATE TABLE "public"."skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "skill_name" character varying NOT NULL, "category_id" uuid, CONSTRAINT "PK_360e4142eb3e858a65771cc9b96" PRIMARY KEY ("id"))`,
    // )
    // await queryRunner.query(
    //   `CREATE TABLE "public"."project_skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "skill_value" integer NOT NULL, "project_id" uuid, "skill_id" uuid, CONSTRAINT "PK_2104f31fbd7f6fb49d415611cea" PRIMARY KEY ("id"))`,
    // )
    // await queryRunner.query(
    //   `CREATE TABLE "public"."resource_skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "skill_value" integer NOT NULL, "resource_id" uuid, "skill_id" uuid, CONSTRAINT "PK_50a624eeb0bf7de6715c9babaf6" PRIMARY KEY ("id"))`,
    // )
    // await queryRunner.query(
    //   `CREATE TYPE "public"."skill_category_skill_category_name_enum" AS ENUM('Technical', 'Relationship', 'Communication', 'Leadership', 'Analytical')`,
    // )
    // await queryRunner.query(
    //   `CREATE TABLE "public"."skill_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "skill_category_name" "public"."skill_category_skill_category_name_enum" NOT NULL, CONSTRAINT "PK_f1490cf530c0fc410b08660380f" PRIMARY KEY ("id"))`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."resource" ADD CONSTRAINT "FK_3d9fc6aeac544df76941632538d" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."resource_allocation" ADD CONSTRAINT "FK_0569e3425b99afbe1daab60354f" FOREIGN KEY ("resource_id") REFERENCES "public"."resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."resource_allocation" ADD CONSTRAINT "FK_d5219d52af091d39dab16517485" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // )
    await queryRunner.query(
      `ALTER TABLE "public"."resource_assignment" ADD CONSTRAINT "FK_ce60a10467ad4b85228ce191e7b" FOREIGN KEY ("resource_allocation_id") REFERENCES "public"."resource_allocation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."resource_assignment" ADD CONSTRAINT "FK_3e8ca23702ccf0d21803a42e71b" FOREIGN KEY ("resource_id") REFERENCES "public"."resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."project" ADD CONSTRAINT "FK_2e4177062fc5a19d1d030281285" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."skill" ADD CONSTRAINT "FK_f1490cf530c0fc410b08660380f" FOREIGN KEY ("category_id") REFERENCES "public"."skill_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."project_skill" ADD CONSTRAINT "FK_0a433e569457a11c96ad03ca8cf" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."project_skill" ADD CONSTRAINT "FK_ae304f4979c60fedce64e11f91a" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."resource_skill" ADD CONSTRAINT "FK_ef3b8438ce3f170c4539c1c55ce" FOREIGN KEY ("resource_id") REFERENCES "public"."resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."resource_skill" ADD CONSTRAINT "FK_b780f8c3a17fddea997b3d5e90e" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   `ALTER TABLE "public"."resource_skill" DROP CONSTRAINT "FK_b780f8c3a17fddea997b3d5e90e"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."resource_skill" DROP CONSTRAINT "FK_ef3b8438ce3f170c4539c1c55ce"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."project_skill" DROP CONSTRAINT "FK_ae304f4979c60fedce64e11f91a"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."project_skill" DROP CONSTRAINT "FK_0a433e569457a11c96ad03ca8cf"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."skill" DROP CONSTRAINT "FK_f1490cf530c0fc410b08660380f"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."project" DROP CONSTRAINT "FK_2e4177062fc5a19d1d030281285"`,
    // )
    await queryRunner.query(
      `ALTER TABLE "public"."resource_assignment" DROP CONSTRAINT "FK_3e8ca23702ccf0d21803a42e71b"`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."resource_assignment" DROP CONSTRAINT "FK_ce60a10467ad4b85228ce191e7b"`,
    )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."resource_allocation" DROP CONSTRAINT "FK_d5219d52af091d39dab16517485"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."resource_allocation" DROP CONSTRAINT "FK_0569e3425b99afbe1daab60354f"`,
    // )
    // await queryRunner.query(
    //   `ALTER TABLE "public"."resource" DROP CONSTRAINT "FK_3d9fc6aeac544df76941632538d"`,
    // )
    // await queryRunner.query(`DROP TABLE "public"."skill_category"`)
    // await queryRunner.query(
    //   `DROP TYPE "public"."skill_category_skill_category_name_enum"`,
    // )
    // await queryRunner.query(`DROP TABLE "public"."resource_skill"`)
    // await queryRunner.query(`DROP TABLE "public"."project_skill"`)
    // await queryRunner.query(`DROP TABLE "public"."skill"`)
    // await queryRunner.query(`DROP TABLE "public"."project"`)
    // await queryRunner.query(`DROP TYPE "public"."project_priority_enum"`)
    // await queryRunner.query(`DROP TYPE "public"."project_project_type_enum"`)
    // await queryRunner.query(`DROP TABLE "public"."resource_assignment"`)
    // await queryRunner.query(`DROP TABLE "public"."resource_allocation"`)
    // await queryRunner.query(`DROP TABLE "public"."resource"`)
    // await queryRunner.query(`DROP TABLE "public"."department"`)
    // await queryRunner.query(`DROP TYPE "public"."department_name_enum"`)
    // await queryRunner.query(`DROP TABLE "public"."client"`)
  }
}
