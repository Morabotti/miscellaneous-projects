import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Customer } from '@customer/entities'
import { CustomerRepository } from '@customer/customer.repo'
import { CustomerDto, NewCustomerDto } from '@customer/interfaces'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly customerRepository: CustomerRepository
  ) {}

  public async getCustomers() {
    const customers = await this.customerRepository.getCustomers()
    return customers.map(this.map)
  }

  public async getCustomer(id: string) {
    const customer = await this.customerRepository.findCustomerById(id)
    return this.map(customer)
  }

  public async deleteCustomer(id: string) {
    return this.customerRepository.removeCustomer(id)
  }

  public async updateCustomer(id: string, customerDto: CustomerDto) {
    const customer = await this.customerRepository.updateCustomer(customerDto)
    return this.map(customer)
  }

  public async createCustomer(newCustomerDto: NewCustomerDto): Promise<CustomerDto> {
    const customer = await this.customerRepository.createCustomer(newCustomerDto)
    return this.map(customer)
  }

  private map(customer: Customer): CustomerDto {
    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      long: customer.long,
      lat: customer.lat
    }
  }
}