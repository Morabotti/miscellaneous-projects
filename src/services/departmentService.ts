import * as jwt from 'jsonwebtoken'
import fetch, { RequestInit } from 'node-fetch'
import { PackedSchedule, PackedGroups } from '../types'
import config from '../config'

export class DepartmentService {
  constructor () {
    console.log(`[BOOT]: [${this.constructor.name}] Service registered`)
  }

  public async testConnection (): Promise<boolean> {
    try {
      const req = await this.send(
        '/api/connection',
        {
          method: 'POST',
          body: JSON.stringify({
            name: config.connections.name,
            token: this.generateToken()
          }),
          headers: { 'Content-Type': 'application/json' }
        }
      )

      if (req.status !== 200) {
        throw new Error()
      }

      console.log('[BOOT]: Successful connection made to main server')
      return true
    } catch (e) {
      console.error(`[ERROR]: Initial connection failed to main server!`)
      return false
    }
  }

  public async sendLatestSchedule (data: PackedSchedule) {
    const populateData: PackedSchedule = {
      ...data,
      token: this.generateToken()
    }

    try {
      await this.send(
        `/api/connection/update/${config.connections.name}/schedule`,
        {
          method: 'POST',
          body: JSON.stringify(populateData),
          headers: { 'Content-Type': 'application/json' }
        }
      )
    } catch (e) {
      console.error(`[ERROR]: Failed to send latest schedule`)
    }
  }

  public async sendGroups (data: PackedGroups) {
    const populateData: PackedGroups = {
      ...data,
      token: this.generateToken()
    }

    try {
      await this.send(
        `/api/connection/update/${config.connections.name}/groups`,
        {
          method: 'POST',
          body: JSON.stringify(populateData),
          headers: { 'Content-Type': 'application/json' }
        }
      )
    } catch (e) {
      console.error(`[ERROR]: Failed to send latest groups`)
    }
  }

  private async send (path: string, request?: RequestInit) {
    return fetch(`${config.connections.url}${config.connections.port}${path}`, request)
  }

  private generateToken = () => {
    return jwt.sign({ name: config.connections.name }, config.connections.secret, { expiresIn: 30 })
  }
}
