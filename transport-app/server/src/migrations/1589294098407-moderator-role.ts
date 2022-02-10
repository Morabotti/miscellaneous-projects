import {MigrationInterface, QueryRunner} from "typeorm";

export class moderatorRole1589294098407 implements MigrationInterface {
    name = 'moderatorRole1589294098407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_8d16b3cfa775999c4481b0d514` ON `destination`", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `role` `role` enum ('admin', 'driver', 'moderator') NOT NULL DEFAULT 'driver'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `role` `role` enum ('admin', 'driver') NOT NULL DEFAULT 'driver'", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_8d16b3cfa775999c4481b0d514` ON `destination` (`targetId`)", undefined);
    }

}
