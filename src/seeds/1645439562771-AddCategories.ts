import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCategories1645439562771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO categories (name) VALUES ('SQL'), ('General')`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
