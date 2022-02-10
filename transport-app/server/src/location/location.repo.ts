import { EntityRepository, Repository } from 'typeorm'
import { LocationEntity } from '@location/entities'
import { HttpException, HttpStatus } from '@nestjs/common'
import { NewLocationDto, LocationDto } from '@location/interfaces'

@EntityRepository(LocationEntity)
export class LocationRepository extends Repository<LocationEntity> {
  getLocations = async () => {
    return this.createQueryBuilder()
      .getMany()
  }

  createLocation = async (newLocationDto: NewLocationDto) => {
    return this.save(newLocationDto)
  }

  findLocationById = async (id: string) => {
    return this.findOneOrFail(id)
  }

  updateLocation = async (locationDto: LocationDto) => {
    return this.save(locationDto)
  }

  removeLocation = async (id: string) => {
    await this.findOneOrFail(id)
    const query = await this.delete(id)

    if (query.affected === 0) {
      throw new HttpException('Failed to remove location', HttpStatus.NOT_FOUND)
    }

    return true
  }
}