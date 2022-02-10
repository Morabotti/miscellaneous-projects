import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from './app.config'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  await app.listen(config.port)
}

bootstrap()
