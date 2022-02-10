import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  type: string

  @Column({ nullable: true })
  plateNumber: string
}
