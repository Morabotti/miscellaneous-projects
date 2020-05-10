import { EntityRepository, Repository } from 'typeorm'
import { Destination } from '@job/entities'

@EntityRepository(Destination)
export class DestinationRepository extends Repository<Destination> {

}