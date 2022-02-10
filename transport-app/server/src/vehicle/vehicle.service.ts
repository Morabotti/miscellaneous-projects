import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Vehicle } from '@vehicle/entities'
import { VehicleRepository } from '@vehicle/vehicle.repo'
import { VehicleDto, NewVehicleDto } from '@vehicle/interfaces'

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleRepository)
    private readonly vehicleRepository: VehicleRepository
  ) {}

  public async getVehicles() {
    const vehicles = await this.vehicleRepository.getVehicles()
    return vehicles.map(this.map)
  }

  public async getVehicle(id: string) {
    const vehicle = await this.vehicleRepository.findVehicleById(id)
    return this.map(vehicle)
  }

  public async deleteVehicle(id: string) {
    return this.vehicleRepository.removeVehicle(id)
  }

  public async updateVehicle(id: string, vehicleDto: VehicleDto) {
    const vehicle = await this.vehicleRepository.updateVehicle(vehicleDto)
    return this.map(vehicle)
  }

  public async createVehicle(newVehicleDto: NewVehicleDto): Promise<VehicleDto> {
    const vehicle = await this.vehicleRepository.createVehicle(newVehicleDto)
    return this.map(vehicle)
  }

  private map(vehicle: Vehicle): VehicleDto {
    return {
      id: vehicle.id,
      type: vehicle.type,
      plateNumber: vehicle.plateNumber
    }
  }
}