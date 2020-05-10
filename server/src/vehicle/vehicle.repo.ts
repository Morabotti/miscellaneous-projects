import { EntityRepository, Repository } from 'typeorm'
import { Vehicle } from '@vehicle/entities'

@EntityRepository(Vehicle)
export class VehicleRepository extends Repository<Vehicle> {

}