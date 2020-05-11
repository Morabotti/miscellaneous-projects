import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { TransportType } from '@app/app.enums'

@Entity()
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column({ type: 'enum', enum: TransportType, default: TransportType.CARGO })
  type: TransportType

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  address: string

  @Column('decimal', { nullable: true, precision: 5, scale: 2 })
  long: number

  @Column('decimal', { nullable: true, precision: 5, scale: 2 })
  lat: number
}
