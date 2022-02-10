import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Customer } from '@customer/entities'
import { CustomerRepository } from '@customer/customer.repo'
import { CustomerService } from '@customer/customer.service'
import { CustomerController } from '@customer/customer.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerRepository])],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService]
})
export class CustomerModule {}
