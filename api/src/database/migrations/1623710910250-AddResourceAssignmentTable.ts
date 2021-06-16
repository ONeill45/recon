import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddResourceAssignmentTable1623710910250
  implements MigrationInterface {
  name = 'AddResourceAssignmentTable1623710910250'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."resource_assignment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP, "end_reason" character varying, "percentage" integer NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying NOT NULL, "deleted_date" TIMESTAMP, "deleted_by" character varying, "resource_allocation_id" uuid, "resource_id" uuid, CONSTRAINT "PK_e304bffe8a3506e876efeb0fa37" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."resource_assignment" ADD CONSTRAINT "FK_ce60a10467ad4b85228ce191e7b" FOREIGN KEY ("resource_allocation_id") REFERENCES "public"."resource_allocation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."resource_assignment" ADD CONSTRAINT "FK_3e8ca23702ccf0d21803a42e71b" FOREIGN KEY ("resource_id") REFERENCES "public"."resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."resource_assignment" DROP CONSTRAINT "FK_3e8ca23702ccf0d21803a42e71b"`,
    )
    await queryRunner.query(
      `ALTER TABLE "public"."resource_assignment" DROP CONSTRAINT "FK_ce60a10467ad4b85228ce191e7b"`,
    )
  }
}
