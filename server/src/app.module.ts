import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'

import configuration, { dbConfig, staticAssetConfig } from '@app/app.configuration'

import { CustomerModule } from '@customer/customer.module'
import { UserModule } from '@user/user.module'
import { AuthModule } from '@auth/auth.module'
import { VehicleModule } from '@vehicle/vehicle.module'
import { LocationModule } from '@location/location.module'
import { JobModule } from '@job/job.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ServeStaticModule.forRoot(staticAssetConfig),
    ConfigModule.forRoot({ load: [configuration] }),
    CustomerModule,
    UserModule,
    AuthModule,
    VehicleModule,
    LocationModule,
    JobModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
