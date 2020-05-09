import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { UserRole } from '@app/app.enums'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  password: string

  @Column({ unique: true })
  email: string

  @Column({ type: 'enum', enum: UserRole, default: UserRole.DRIVER })
  role: UserRole

  @CreateDateColumn()
  createdAt: string
}