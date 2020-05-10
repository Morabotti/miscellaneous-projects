import { EntityRepository, Repository } from 'typeorm'
import { Job } from '@job/entities'

@EntityRepository(Job)
export class JobRepository extends Repository<Job> {

}