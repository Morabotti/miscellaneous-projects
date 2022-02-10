import { EntityRepository, Repository } from 'typeorm'
import { HttpException, HttpStatus } from '@nestjs/common'

import { Customer } from '@customer/entities'
import { NewCustomerDto, CustomerDto } from '@customer/interfaces'

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  getCustomers = async () => {
    return this.createQueryBuilder()
      .getMany()
  }

  createCustomer = async (newCustomerDto: NewCustomerDto) => {
    return this.save(newCustomerDto)
  }

  findCustomerById = async (id: string) => {
    return this.findOneOrFail(id)
  }

  updateCustomer = async (customerDto: CustomerDto) => {
    return this.save(customerDto)
  }

  removeCustomer = async (id: string) => {
    await this.findOneOrFail(id)
    const query = await this.delete(id)

    if (query.affected === 0) {
      throw new HttpException('Failed to remove customer', HttpStatus.NOT_FOUND)
    }

    return true
  }
}