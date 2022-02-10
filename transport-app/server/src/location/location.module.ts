import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LocationEntity } from '@location/entities'
import { LocationRepository } from '@location/location.repo'
import { LocationService } from '@location/location.service'
import { LocationController } from '@location/location.controller'

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity, LocationRepository])],
  providers: [LocationService],
  controllers: [LocationController],
  exports: [LocationService]
})
export class LocationModule {}
