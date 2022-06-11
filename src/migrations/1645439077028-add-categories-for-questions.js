const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addCategoriesForQuestions1645439077028 {
    name = 'addCategoriesForQuestions1645439077028'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "belongsToCategoryId" integer`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_a111caf2e3df0e1f8d61c5678a6" FOREIGN KEY ("belongsToCategoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_a111caf2e3df0e1f8d61c5678a6"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "belongsToCategoryId"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }
}
