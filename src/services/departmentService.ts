import * as jwt from 'jsonwebtoken'
import fetch, { RequestInit } from 'node-fetch'
import { PackedSchedule, PackedGroups } from '../types'
import config from '../config'

export class DepartmentService {
  constructor () {
    console.log(`[BOOT]: [${this.constructor.name}] Service registered`)
  }

  public async testConnection () {
    try {
      await this.send(
        '/api/connections',
        {
          method: 'POST',
          body: JSON.stringify({
            name: config.connections.name,
            auth: this.generateToken()
          })
        }
      )
    } catch (e) {
      console.error(`[ERROR]: Initial connection failed to main server!`)
    }
  }

  public async sendLatestSchedule (data: PackedSchedule) {
    const populateData: PackedSchedule = {
      ...data,
      auth: this.generateToken()
    }

    try {
      const res = await this.send(
        `/api/update/${config.connections.name}/schedule`,
        {
          method: 'POST',
          body: JSON.stringify(populateData)
        }
      )
      const data = await res.json()
      console.log(data)
    } catch (e) {
      console.error(`[ERROR]: Failed to send latest schedule`)
    }
  }

  public async sendGroups (data: PackedGroups) {
    const populateData: PackedGroups = {
      ...data,
      auth: this.generateToken()
    }

    try {
      const res = await this.send(
        `/api/update/${config.connections.name}/groups`,
        {
          method: 'POST',
          body: JSON.stringify(populateData)
        }
      )
      const data = await res.json()
      console.log(data)
    } catch (e) {
      console.error(`[ERROR]: Failed to send latest groups`)
    }
  }

  private async send (path: string, request?: RequestInit) {
    return fetch(`${config.connections.url}${config.connections.port}${path}`, request)
  }

  private generateToken = () => {
    return jwt.sign({}, config.connections.secret, { expiresIn: 60 })
  }
}
