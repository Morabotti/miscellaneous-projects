import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/app.module'
import { ConfigService } from '@nestjs/config'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT')

  await app.listen(port)
}

bootstrap()
