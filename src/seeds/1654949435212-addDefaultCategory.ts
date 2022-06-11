import {MigrationInterface, QueryRunner} from "typeorm";

export class addDefaultCategory1654949435212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(``) todo default category
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
