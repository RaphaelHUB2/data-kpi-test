import { MigrationInterface, QueryRunner } from "typeorm";


export class newTableKpiInfo1680521670686 implements MigrationInterface {
    name = 'newTableKpiInfo1680521670686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "kpi_info" ("type" "public"."kpi_type_enum" NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b109512ec9034377436af1d9113" PRIMARY KEY ("type"))`);
        await queryRunner.query(`INSERT INTO "kpi_info" ("type", "title", "description")
        VALUES ('success_rate__transfer_orange_ci', 'Success Rate - PAY-OUT Orange CI', 'This is the success rate for PAY-OUT using the Orange CI provider'),
        ('success_rate__transfer_mtn_ci', 'Success Rate - PAY-OUT MTN CI', 'This is the success rate for PAY-OUT using the MTN CI provider'),
        ('success_rate__transfer_moov_ci', 'Success Rate - PAY-OUT Moov CI', 'This is the success rate for PAY-OUT using the Moov CI provider'),
        ('success_rate__transfer_wave_ci', 'Success Rate - PAY-OUT Wave CI', 'This is the success rate for PAY-OUT using the Wave CI provider'),
        ('success_rate__payment_orange_ci', 'Success Rate - PAY-IN Orange CI', 'This is the success rate for PAY-IN using the Orange CI provider'),
        ('success_rate__payment_mtn_ci', 'Success Rate - PAY-IN MTN CI', 'This is the success rate for PAY-IN using the MTN CI provider'),
        ('success_rate__payment_moov_ci', 'Success Rate - PAY-IN Moov CI', 'This is the success rate for PAY-IN using the Moov CI provider'),
        ('success_rate__payment_wave_ci', 'Success Rate - PAY-IN Wave CI', 'This is the success rate for PAY-IN using the Wave CI provider'),
        ('success_rate__transfer_all', 'Success Rate - PAY-OUT all', 'This is the mean success rate for PAY-OUT'),
        ('success_rate__payment_all', 'Success Rate - PAY-IN all', 'This is the mean success rate for PAY-IN'),
        ('volume_xaf', 'Volume XAF', 'This is the volume of XAF exchanged'),
        ('volume_xof', 'Volume XOF', 'This is the volume of XOF exchanged'),
        ('transaction_last_one', 'Last transaction date', 'This is the date of the last transaction')
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "kpi_info"`);
    }

}
