import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  address: string

  @Column('decimal', { nullable: true, precision: 5, scale: 2 })
  long: number

  @Column('decimal', { nullable: true, precision: 5, scale: 2 })
  lat: number
}
