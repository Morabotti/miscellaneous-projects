import { UserRole } from '@app/app.enums'

export class UserDto {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly role: UserRole
  readonly createdAt?: string
}
