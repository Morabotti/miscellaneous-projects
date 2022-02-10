import { TransportType } from '@app/app.enums'

export class NewLocationDto {
  readonly name: string
  readonly type: TransportType
  readonly phone: string | null
  readonly address: string | null
  readonly long: number | null
  readonly lat: number | null
}
