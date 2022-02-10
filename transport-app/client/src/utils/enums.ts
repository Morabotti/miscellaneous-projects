import { AuthRoles } from '@types'

interface RoleListing {
  value: AuthRoles,
  label: string
}

export const roleListing: RoleListing[] = [
  { value: AuthRoles.ADMIN, label: 'Admin' },
  { value: AuthRoles.MODERATOR, label: 'Moderator' },
  { value: AuthRoles.DRIVER, label: 'Driver' }
]
