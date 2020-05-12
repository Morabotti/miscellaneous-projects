import { Controller, Res, HttpStatus, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { Response } from 'express'

import { CustomerService } from '@customer/customer.service'
import { CustomerDto, NewCustomerDto } from '@customer/interfaces'

@Controller('/api/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/:id')
  public async getById(
    @Res() res: Response,
    @Param('id') id
  ) {
    try {
      const customer = await this.customerService.getCustomer(id)
      return res.status(HttpStatus.OK).json(customer)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
    }
  }

  @Delete('/:id')
  public async deleteById(
    @Res() res: Response,
    @Param('id') id
  ) {
    await this.customerService.deleteCustomer(id)
    return res.status(HttpStatus.OK).send()
  }

  @Put('/:id')
  public async updateById(
    @Res() res: Response,
    @Param('id') id,
    @Body() customerDto: CustomerDto
  ) {
    try {
      const customer = await this.customerService.updateCustomer(id, customerDto)
      return res.status(HttpStatus.OK).json(customer)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }

  @Get()
  public async getAll(@Res() res: Response) {
    try {
      const customers = await this.customerService.getCustomers()
      return res.status(HttpStatus.OK).json(customers)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
    }
  }

  @Post()
  public async create(
    @Res() res: Response,
    @Body() newCustomerDto: NewCustomerDto
  ) {
    try {
      const customer = await this.customerService.createCustomer(newCustomerDto)
      return res.status(HttpStatus.OK).json(customer)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
    }
  }
}