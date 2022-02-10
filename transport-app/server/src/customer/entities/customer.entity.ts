import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  address: string

  @Column('decimal', { nullable: true, precision: 5, scale: 2 })
  long: number

  @Column('decimal', { nullable: true, precision: 5, scale: 2 })
  lat: number
}
