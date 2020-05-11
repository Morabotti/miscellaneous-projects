import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { Customer } from '@customer/entities'
import { LocationEntity } from '@location/entities'
import { Job } from '@job/entities'

@Entity()
export class Destination {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'boolean', default: false })
  visited: boolean

  @Column({ type: 'boolean', default: false })
  dropPoint: boolean

  @Column({ type: 'date', nullable: true })
  estimation: string

  @ManyToOne(type => Job, job => job.destinations)
  @JoinColumn()
  job: Job

  @OneToOne(type => Customer, { nullable: true })
  @JoinColumn()
  customer: Customer

  @OneToOne(type => LocationEntity, { nullable: true })
  @JoinColumn()
  location: LocationEntity

  @OneToOne(type => LocationEntity, { nullable: true })
  @JoinColumn()
  target: LocationEntity
}
