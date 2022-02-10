import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Job, Destination } from '@job/entities'
import { DestinationRepository } from '@job/destination.repo'
import { JobRepository } from '@job/job.repo'

@Module({
  imports: [TypeOrmModule.forFeature([
    Job,
    JobRepository,
    Destination,
    DestinationRepository
  ])]
})
export class JobModule {}
