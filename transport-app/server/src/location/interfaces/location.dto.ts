import { TransportType } from '@app/app.enums'

export class LocationDto {
  readonly id: number
  readonly name: string
  readonly type: TransportType
  readonly phone: string | null
  readonly address: string | null
  readonly long: number | null
  readonly lat: number | null
}
