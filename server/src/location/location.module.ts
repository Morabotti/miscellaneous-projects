import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LocationEntity } from '@location/entities'
import { LocationRepository } from '@location/location.repo'

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity, LocationRepository])]
})
export class LocationModule {}
