import { EntityRepository, Repository } from 'typeorm'
import { LocationEntity } from '@location/entities'

@EntityRepository(LocationEntity)
export class LocationRepository extends Repository<LocationEntity> {

}