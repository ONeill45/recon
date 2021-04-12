import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdatePriorityColumn1615572495425 implements MigrationInterface {
  name = 'UpdatePriorityColumn1615572495425'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ALTER COLUMN "email" SET NOT NULL',
    )
    await queryRunner.query(
      'COMMENT ON COLUMN "public"."resource"."email" IS NULL',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."project" DROP COLUMN "priority"',
    )
    await queryRunner.query(
      // eslint-disable-next-line quotes
      "CREATE TYPE \"public\".\"project_priority_enum\" AS ENUM('High', 'Medium', 'Low')",
    )
    await queryRunner.query(
      'ALTER TABLE "public"."project" ADD "priority" "public"."project_priority_enum" NOT NULL DEFAULT \'High\'',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."project" DROP COLUMN "priority"',
    )
    await queryRunner.query('DROP TYPE "public"."project_priority_enum"')
    await queryRunner.query(
      'ALTER TABLE "public"."project" ADD "priority" integer NOT NULL DEFAULT 0',
    )
    await queryRunner.query(
      'COMMENT ON COLUMN "public"."resource"."email" IS NULL',
    )
    await queryRunner.query(
      'ALTER TABLE "public"."resource" ALTER COLUMN "email" DROP NOT NULL',
    )
  }
}
