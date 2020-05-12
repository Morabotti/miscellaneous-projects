import { Controller, Res, HttpStatus, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { Response } from 'express'

import { VehicleService } from '@vehicle/vehicle.service'
import { VehicleDto, NewVehicleDto } from '@vehicle/interfaces'

@Controller('/api/vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('/:id')
  public async getById(
    @Res() res: Response,
    @Param('id') id
  ) {
    try {
      const vehicle = await this.vehicleService.getVehicle(id)
      return res.status(HttpStatus.OK).json(vehicle)
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
    await this.vehicleService.deleteVehicle(id)
    return res.status(HttpStatus.OK).send()
  }

  @Put('/:id')
  public async updateById(
    @Res() res: Response,
    @Param('id') id,
    @Body() vehicleDto: VehicleDto
  ) {
    try {
      const vehicle = await this.vehicleService.updateVehicle(id, vehicleDto)
      return res.status(HttpStatus.OK).json(vehicle)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }

  @Get()
  public async getAll(@Res() res: Response) {
    try {
      const vehicles = await this.vehicleService.getVehicles()
      return res.status(HttpStatus.OK).json(vehicles)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
    }
  }

  @Post()
  public async create(
    @Res() res: Response,
    @Body() newVehicleDto: NewVehicleDto
  ) {
    try {
      const vehicle = await this.vehicleService.createVehicle(newVehicleDto)
      return res.status(HttpStatus.OK).json(vehicle)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
    }
  }
}