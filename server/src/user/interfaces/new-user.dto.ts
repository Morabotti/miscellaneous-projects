import { UserRole } from '@app/app.enums'

export class NewUserDto {
  readonly name: string
  readonly email: string
  readonly role: UserRole
  readonly password: string

  constructor (user: NewUserDto) {
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.role = user.role
  }
}
