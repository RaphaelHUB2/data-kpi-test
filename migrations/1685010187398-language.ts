import { MigrationInterface, QueryRunner } from "typeorm";

export class Language1685010187398 implements MigrationInterface {
    name = 'Language1685010187398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropPrimaryKey("kpi_info");
        await queryRunner.query(`ALTER TABLE "kpi_info" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "kpi_info" ADD PRIMARY KEY (id)`);
        await queryRunner.query(`ALTER TABLE "kpi_info" ADD "language" character varying`);
        await queryRunner.query(`ALTER TABLE "kpi_info" ADD CONSTRAINT unique_type_language UNIQUE ("type", "language")`);
        await queryRunner.query(`UPDATE "kpi_info" SET language = 'en';`);
        await queryRunner.query(`ALTER TABLE "kpi_info" ALTER COLUMN "language" SET NOT NULL`);
        await queryRunner.query(`INSERT INTO "kpi_info" ("type", "title", "description", "language")
         VALUES ('success_rate__transfer_orange_ci', 'Taux de succès - PAY-OUT Orange CI', 'Taux de succès pour les PAY-OUT utilisant l''opérateur Orange CI', 'fr'),
         ('success_rate__transfer_mtn_ci', 'Taux de succès- PAY-OUT MTN CI', 'Taux de succès pour les PAY-OUT utilisant l''opérateur MTN CI', 'fr'),
         ('success_rate__transfer_moov_ci', 'Taux de succès - PAY-OUT Moov CI', 'Taux de succès pour les PAY-OUT utilisant l''opérateur Moov CI', 'fr'),
         ('success_rate__transfer_wave_ci', 'Taux de succès - PAY-OUT Wave CI', 'Taux de succès pour les PAY-OUT utilisant l''opérateur Wave CI', 'fr'),
         ('success_rate__payment_orange_ci', 'Taux de succès - PAY-IN Orange CI', 'Taux de succès pour les PAY-IN utilisant l''opérateur Orange CI', 'fr'),
         ('success_rate__payment_mtn_ci', 'Taux de succès - PAY-IN MTN CI', 'Taux de succès pour les PAY-IN utilisant l''opérateur MTN CI', 'fr'),
         ('success_rate__payment_moov_ci', 'Taux de succès - PAY-IN Moov CI', 'Taux de succès pour les PAY-IN utilisant l''opérateur Moov CI', 'fr'),
         ('success_rate__payment_wave_ci', 'Taux de succès - PAY-IN Wave CI', 'Taux de succès pour les PAY-IN utilisant l''opérateur Wave CI', 'fr'),
         ('success_rate__transfer_all', 'Taux de succès - PAY-OUT all', 'Moyenne du taux de succès pour les PAY-OUT', 'fr'),
         ('success_rate__payment_all', 'Taux de succès - PAY-IN all', 'Moyenne du taux de succès pour les PAY-IN', 'fr'),
         ('volume_xaf', 'Volume XAF', 'Volume de XAF échangé', 'fr'),
         ('volume_xof', 'Volume XOF', 'Volume de XOF échangé', 'fr'),
         ('transaction_last_one', 'Date de la dernière transaction', 'Date de la dernière transaction', 'fr')
         `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "kpi_info" WHERE language = 'fr';`);
        await queryRunner.dropPrimaryKey("kpi_info");
        await queryRunner.query(`ALTER TABLE "kpi_info" DROP id`);
        await queryRunner.createPrimaryKey("kpi_info", ["type"]);
        await queryRunner.query(`ALTER TABLE "kpi_info" DROP CONSTRAINT unique_type_language`);
        await queryRunner.query(`ALTER TABLE "kpi_info" DROP COLUMN "language"`);
    }

}
