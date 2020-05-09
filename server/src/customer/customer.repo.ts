import { EntityRepository, Repository } from 'typeorm'
import { Customer } from '@customer/entities'

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

}