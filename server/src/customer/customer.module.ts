import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from '@customer/entities'
import { CustomerRepository } from '@customer/customer.repo'

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerRepository])]
})
export class CustomerModule {}
