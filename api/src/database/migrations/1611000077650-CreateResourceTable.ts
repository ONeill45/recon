import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateResourceTable1611000077650 implements MigrationInterface {
    name = 'CreateResourceTable1611000077650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."resource" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying, "last_name" character varying NOT NULL, "preferred_name" character varying, "title" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "termination_date" TIMESTAMP, CONSTRAINT "PK_686804d7e124091144f01711dcd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."resource"`);
    }

}
