import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Vehicle } from '@vehicle/entities'
import { VehicleRepository } from '@vehicle/vehicle.repo'
import { VehicleService } from '@vehicle/vehicle.service'
import { VehicleController } from '@vehicle/vehicle.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, VehicleRepository])],
  providers: [VehicleService],
  controllers: [VehicleController],
  exports: [VehicleService]
})
export class VehicleModule {}
