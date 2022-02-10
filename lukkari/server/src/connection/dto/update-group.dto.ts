import { IsNotEmpty } from 'class-validator'
import { Group } from '../../app.types'

export class UpdateGroupDto {
  @IsNotEmpty()
  readonly name: string

  @IsNotEmpty()
  readonly department: string

  @IsNotEmpty()
  readonly data: Group[]

  @IsNotEmpty()
  readonly token: string
}
