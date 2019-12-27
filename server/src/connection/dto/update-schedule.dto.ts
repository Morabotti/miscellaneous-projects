import { IsNotEmpty } from 'class-validator'
import { Week } from '../../app.types'

export class UpdateScheduleDto {
  @IsNotEmpty()
  readonly name: string

  @IsNotEmpty()
  readonly groupId: string

  @IsNotEmpty()
  readonly department: string

  @IsNotEmpty()
  readonly data: Week[]

  @IsNotEmpty()
  readonly token: string
}
