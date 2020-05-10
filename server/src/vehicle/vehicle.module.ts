import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Vehicle } from '@vehicle/entities'
import { VehicleRepository } from '@vehicle/vehicle.repo'

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, VehicleRepository])]
})
export class VehicleModule {}
