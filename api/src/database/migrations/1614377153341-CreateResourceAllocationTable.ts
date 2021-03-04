import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateResourceAllocationTable1614377153341
  implements MigrationInterface {
  name = 'CreateResourceAllocationTable1614377153341'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "public"."resource_allocation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP, "end_reason" character varying, "percentage" integer NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying NOT NULL, "deleted_date" TIMESTAMP, "deleted_by" character varying, "resource_id" uuid, "project_id" uuid, CONSTRAINT "PK_2915aa405462cdd07266b498159" PRIMARY KEY ("id"))',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource_allocation" ADD CONSTRAINT "FK_0569e3425b99afbe1daab60354f" FOREIGN KEY ("resource_id") REFERENCES "public"."resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource_allocation" ADD CONSTRAINT "FK_d5219d52af091d39dab16517485" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."resource_allocation" DROP CONSTRAINT "FK_d5219d52af091d39dab16517485"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource_allocation" DROP CONSTRAINT "FK_0569e3425b99afbe1daab60354f"',
    )
    await queryRunner.query('DROP TABLE "public"."resource_allocation"')
  }
}
