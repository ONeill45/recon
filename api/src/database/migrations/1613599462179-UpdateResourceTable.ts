import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateResourceTable1613599462179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ADD "image_url" character varying',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ADD "department_id" uuid',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ADD "email" character varying',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ADD CONSTRAINT "FK_3d9fc6aeac544df76941632538d" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."resource" DROP CONSTRAINT "FK_3d9fc6aeac544df76941632538d"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" DROP COLUMN "email"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" DROP COLUMN "department_id"',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" DROP COLUMN "image_url"',
    )
  }
}
