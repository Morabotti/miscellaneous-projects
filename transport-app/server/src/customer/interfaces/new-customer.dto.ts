export class NewCustomerDto {
  readonly firstName: string
  readonly lastName: string
  readonly phone: string | null
  readonly email: string | null
  readonly address: string | null
  readonly long: number | null
  readonly lat: number | null
}
