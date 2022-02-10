import { EntityRepository, Repository } from 'typeorm'
import { Vehicle } from '@vehicle/entities'
import { HttpException, HttpStatus } from '@nestjs/common'
import { NewVehicleDto, VehicleDto } from '@vehicle/interfaces'

@EntityRepository(Vehicle)
export class VehicleRepository extends Repository<Vehicle> {
  getVehicles = async () => {
    return this.createQueryBuilder()
      .getMany()
  }

  createVehicle = async (newVehicleDto: NewVehicleDto) => {
    return this.save(newVehicleDto)
  }

  findVehicleById = async (id: string) => {
    return this.findOneOrFail(id)
  }

  updateVehicle = async (vehicleDto: VehicleDto) => {
    return this.save(vehicleDto)
  }

  removeVehicle = async (id: string) => {
    await this.findOneOrFail(id)
    const query = await this.delete(id)

    if (query.affected === 0) {
      throw new HttpException('Failed to remove vehicle', HttpStatus.NOT_FOUND)
    }

    return true
  }
}