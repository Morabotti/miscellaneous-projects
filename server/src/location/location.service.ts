import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { LocationEntity } from '@location/entities'
import { LocationRepository } from '@location/location.repo'
import { LocationDto, NewLocationDto } from '@location/interfaces'

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationRepository)
    private readonly locationRepository: LocationRepository
  ) {}

  public async getLocations() {
    const locations = await this.locationRepository.getLocations()
    return locations.map(this.map)
  }

  public async getLocation(id: string) {
    const location = await this.locationRepository.findLocationById(id)
    return this.map(location)
  }

  public async deleteLocation(id: string) {
    return this.locationRepository.removeLocation(id)
  }

  public async updateLocation(id: string, locationDto: LocationDto) {
    const location = await this.locationRepository.updateLocation(locationDto)
    return this.map(location)
  }

  public async createLocation(newLocationDto: NewLocationDto): Promise<LocationDto> {
    const location = await this.locationRepository.createLocation(newLocationDto)
    return this.map(location)
  }

  private map(location: LocationEntity): LocationDto {
    return {
      id: location.id,
      name: location.name,
      type: location.type,
      phone: location.phone,
      address: location.address,
      long: location.long,
      lat: location.lat
    }
  }
}