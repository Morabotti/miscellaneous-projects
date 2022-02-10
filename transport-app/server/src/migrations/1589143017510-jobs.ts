import {MigrationInterface, QueryRunner} from "typeorm";

export class jobs1589143017510 implements MigrationInterface {
    name = 'jobs1589143017510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `location` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `phone` varchar(255) NULL, `address` varchar(255) NULL, `long` decimal(5,2) NULL, `lat` decimal(5,2) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `vehicle` (`id` int NOT NULL AUTO_INCREMENT, `type` varchar(255) NOT NULL, `plateNumber` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `job` (`id` varchar(36) NOT NULL, `type` enum ('passanger', 'cargo') NOT NULL, `estimatedStart` date NULL, `estimatedEnd` date NULL, `done` tinyint NOT NULL DEFAULT 0, `vehicleId` int NULL, `destinationsId` varchar(36) NULL, UNIQUE INDEX `REL_809fdb28ed0bd30fbbb0fc2aea` (`vehicleId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `destination` (`id` varchar(36) NOT NULL, `visited` tinyint NOT NULL DEFAULT 0, `estimation` date NULL, `jobId` varchar(36) NULL, `customerId` int NULL, `locationId` int NULL, UNIQUE INDEX `REL_8cb1b8404bf3a618fa5bed1d7f` (`customerId`), UNIQUE INDEX `REL_d926a9a9ec7664c4aa3d4ba05a` (`locationId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `customer` DROP PRIMARY KEY", undefined);
        await queryRunner.query("ALTER TABLE `customer` DROP COLUMN `id`", undefined);
        await queryRunner.query("ALTER TABLE `customer` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT", undefined);
        await queryRunner.query("ALTER TABLE `job` ADD CONSTRAINT `FK_809fdb28ed0bd30fbbb0fc2aeae` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `job` ADD CONSTRAINT `FK_4914c5566321eef532248918c16` FOREIGN KEY (`destinationsId`) REFERENCES `destination`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `destination` ADD CONSTRAINT `FK_afb697dcb8cd79b93511b65cb8a` FOREIGN KEY (`jobId`) REFERENCES `job`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `destination` ADD CONSTRAINT `FK_8cb1b8404bf3a618fa5bed1d7fc` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `destination` ADD CONSTRAINT `FK_d926a9a9ec7664c4aa3d4ba05a2` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `destination` DROP FOREIGN KEY `FK_d926a9a9ec7664c4aa3d4ba05a2`", undefined);
        await queryRunner.query("ALTER TABLE `destination` DROP FOREIGN KEY `FK_8cb1b8404bf3a618fa5bed1d7fc`", undefined);
        await queryRunner.query("ALTER TABLE `destination` DROP FOREIGN KEY `FK_afb697dcb8cd79b93511b65cb8a`", undefined);
        await queryRunner.query("ALTER TABLE `job` DROP FOREIGN KEY `FK_4914c5566321eef532248918c16`", undefined);
        await queryRunner.query("ALTER TABLE `job` DROP FOREIGN KEY `FK_809fdb28ed0bd30fbbb0fc2aeae`", undefined);
        await queryRunner.query("ALTER TABLE `customer` DROP COLUMN `id`", undefined);
        await queryRunner.query("ALTER TABLE `customer` ADD `id` varchar(36) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `customer` ADD PRIMARY KEY (`id`)", undefined);
        await queryRunner.query("DROP INDEX `REL_d926a9a9ec7664c4aa3d4ba05a` ON `destination`", undefined);
        await queryRunner.query("DROP INDEX `REL_8cb1b8404bf3a618fa5bed1d7f` ON `destination`", undefined);
        await queryRunner.query("DROP TABLE `destination`", undefined);
        await queryRunner.query("DROP INDEX `REL_809fdb28ed0bd30fbbb0fc2aea` ON `job`", undefined);
        await queryRunner.query("DROP TABLE `job`", undefined);
        await queryRunner.query("DROP TABLE `vehicle`", undefined);
        await queryRunner.query("DROP TABLE `location`", undefined);
    }

}
