import { IsNotEmpty } from 'class-validator'

export class TestConnectionDto {
  @IsNotEmpty()
  readonly name: string

  @IsNotEmpty()
  readonly token: string
}
