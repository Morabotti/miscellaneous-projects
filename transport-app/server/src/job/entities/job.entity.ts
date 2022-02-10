import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm'
import { TransportType } from '@app/app.enums'
import { Vehicle } from '@vehicle/entities'
import { Destination } from './destination.entity'

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: TransportType })
  type: TransportType

  @Column({ type: 'date', nullable: true })
  estimatedStart: string

  @Column({ type: 'date', nullable: true })
  estimatedEnd: string

  @Column({ type: 'boolean', default: false })
  done: boolean

  @OneToOne(type => Vehicle)
  @JoinColumn()
  vehicle: Vehicle

  @ManyToOne(type => Destination, destination => destination.job, { cascade: true })
  @JoinColumn()
  destinations: Destination[]
}
