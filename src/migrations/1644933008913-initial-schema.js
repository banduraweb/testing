const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialSchema1644933008913 {
    name = 'initialSchema1644933008913'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "roles_entity" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d40adf1f0bda238c39fdbf8ab10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "roleId" integer, CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_result" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "questionId" integer, "variantId" integer, CONSTRAINT "UQ_6c48a811ce6f6b03bcc9073a407" UNIQUE ("userId", "questionId", "variantId"), CONSTRAINT "UQ_39230bc1991405f50fc62284ce7" UNIQUE ("userId", "questionId"), CONSTRAINT "PK_83a863e7e6790967b26bf8972e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "variants" ("id" SERIAL NOT NULL, "variant" character varying NOT NULL, "isCorrect" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "belongsToQuestionId" integer, CONSTRAINT "PK_672d13d1a6de0197f20c6babb5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_result" ADD CONSTRAINT "FK_2a3121e3fc3ff3a2c935075c7d7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_result" ADD CONSTRAINT "FK_4776cc46908654f477bbf7654ae" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_result" ADD CONSTRAINT "FK_8387edd61fae2af4fa4f065efa3" FOREIGN KEY ("variantId") REFERENCES "variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variants" ADD CONSTRAINT "FK_c3b0086a98a2ce08e95d3801ed7" FOREIGN KEY ("belongsToQuestionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "variants" DROP CONSTRAINT "FK_c3b0086a98a2ce08e95d3801ed7"`);
        await queryRunner.query(`ALTER TABLE "users_result" DROP CONSTRAINT "FK_8387edd61fae2af4fa4f065efa3"`);
        await queryRunner.query(`ALTER TABLE "users_result" DROP CONSTRAINT "FK_4776cc46908654f477bbf7654ae"`);
        await queryRunner.query(`ALTER TABLE "users_result" DROP CONSTRAINT "FK_2a3121e3fc3ff3a2c935075c7d7"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "variants"`);
        await queryRunner.query(`DROP TABLE "users_result"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles_entity"`);
    }
}
