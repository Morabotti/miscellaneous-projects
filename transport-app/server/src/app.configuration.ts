import { ServeStaticModuleOptions } from '@nestjs/serve-static'
import { join } from 'path'

import * as _dbConfig from './ormconfig'

export const dbConfig = _dbConfig

export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 8080
})

export const staticAssetConfig: ServeStaticModuleOptions = {
  rootPath: join(__dirname, '..', '..', 'client', 'build')
}
