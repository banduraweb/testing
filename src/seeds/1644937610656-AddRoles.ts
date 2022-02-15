import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoles1644937610656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO roles_entity (role) VALUES ('ADMIN'), ('USER')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
