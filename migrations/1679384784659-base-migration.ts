import { MigrationInterface, QueryRunner } from "typeorm";


export class baseMigration1679384784659 implements MigrationInterface {
    name = 'baseMigration1679384784659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "kpi_type_enum" AS ENUM(
            'success_rate__transfer_orange_ci',
            'success_rate__transfer_mtn_ci',
            'success_rate__transfer_moov_ci',
            'success_rate__transfer_wave_ci',
            'success_rate__payment_orange_ci',
            'success_rate__payment_mtn_ci',
            'success_rate__payment_moov_ci',
            'success_rate__payment_wave_ci',
            'success_rate__transfer_all',
            'success_rate__payment_all',
            'volume_xaf',
            'volume_xof',
            'transaction_last_one'
        )`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "kpi" ("id" SERIAL NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "type" "public"."kpi_type_enum" NOT NULL, "value" jsonb NOT NULL, CONSTRAINT "PK_56589835e31cc0331684d2d28a7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
