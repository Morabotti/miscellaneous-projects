import {MigrationInterface, QueryRunner} from "typeorm";

export class jobTargets1589210566443 implements MigrationInterface {
    name = 'jobTargets1589210566443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `location` ADD `type` enum ('passanger', 'cargo') NOT NULL DEFAULT 'cargo'", undefined);
        await queryRunner.query("ALTER TABLE `destination` ADD `dropPoint` tinyint NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `destination` ADD `targetId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `destination` ADD UNIQUE INDEX `IDX_8d16b3cfa775999c4481b0d514` (`targetId`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_8d16b3cfa775999c4481b0d514` ON `destination` (`targetId`)", undefined);
        await queryRunner.query("ALTER TABLE `destination` ADD CONSTRAINT `FK_8d16b3cfa775999c4481b0d5142` FOREIGN KEY (`targetId`) REFERENCES `location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `destination` DROP FOREIGN KEY `FK_8d16b3cfa775999c4481b0d5142`", undefined);
        await queryRunner.query("DROP INDEX `REL_8d16b3cfa775999c4481b0d514` ON `destination`", undefined);
        await queryRunner.query("ALTER TABLE `destination` DROP INDEX `IDX_8d16b3cfa775999c4481b0d514`", undefined);
        await queryRunner.query("ALTER TABLE `destination` DROP COLUMN `targetId`", undefined);
        await queryRunner.query("ALTER TABLE `destination` DROP COLUMN `dropPoint`", undefined);
        await queryRunner.query("ALTER TABLE `location` DROP COLUMN `type`", undefined);
    }

}
