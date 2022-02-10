import { Controller, Res, HttpStatus, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { Response } from 'express'

import { LocationService } from '@location/location.service'
import { LocationDto, NewLocationDto } from '@location/interfaces'

@Controller('/api/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/:id')
  public async getById(
    @Res() res: Response,
    @Param('id') id
  ) {
    try {
      const location = await this.locationService.getLocation(id)
      return res.status(HttpStatus.OK).json(location)
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
    await this.locationService.deleteLocation(id)
    return res.status(HttpStatus.OK).send()
  }

  @Put('/:id')
  public async updateById(
    @Res() res: Response,
    @Param('id') id,
    @Body() locationDto: LocationDto
  ) {
    try {
      const location = await this.locationService.updateLocation(id, locationDto)
      return res.status(HttpStatus.OK).json(location)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }

  @Get()
  public async getAll(@Res() res: Response) {
    try {
      const locations = await this.locationService.getLocations()
      return res.status(HttpStatus.OK).json(locations)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
    }
  }

  @Post()
  public async create(
    @Res() res: Response,
    @Body() newLocationDto: NewLocationDto
  ) {
    try {
      const location = await this.locationService.createLocation(newLocationDto)
      return res.status(HttpStatus.OK).json(location)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
    }
  }
}