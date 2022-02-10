import { Injectable } from '@nestjs/common'
import { UpdateGroupDto } from './dto/update-group.dto'
import { Token } from '../app.types'
import { writeFile } from 'jsonfile'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { CurrentSituation } from './connection.types'
import config from '../app.config'

import * as path from 'path'
import * as jwt from 'jsonwebtoken'
import * as fs from 'fs'
import * as glob from 'glob'

@Injectable()
export class ConnectionService {
  private readonly dbPath = './db'

  public verifyConnection(auth: string, name: string): boolean {
    try {
      const token = jwt.verify(auth, config.vamkSecret) as Token
      if (token.name !== name) {
        return false
      }
      return true
    } catch (e) {
      return false
    }
  }

  public async updateSchedule({ department, groupId, data }: UpdateScheduleDto, source: string) {
    const filePath = `${this.dbPath}/${source}/schedules/${department}/${groupId}.json`
    await this.writeUpdate(filePath, data)
  }

  public async updateGroups({ department, data }: UpdateGroupDto, source: string) {
    const filePath = `${this.dbPath}/${source}/department/${department}.json`
    await this.writeUpdate(filePath, data)
  }

  public async getCurrentSituation(source: string): Promise<CurrentSituation> {
    const rootPath = `${this.dbPath}/${source}`
    const departments = await this.readFiles(`${rootPath}/department/*.json`)
    const schedules = await this.readFiles(`${rootPath}/schedules/**/*.json`)

    let situation: CurrentSituation = {
      department: departments.length !== 0,
      schedules: schedules.length !== 0
    }

    return situation
  }

  private async readFiles(filePath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      glob(filePath, (err, matches) => {
        if (err) {
          return reject(err)
        }

        resolve(matches)
      })
    })
  }

  private async writeUpdate(filePath: string, data: Object) {
    try {
      await writeFile(filePath, data)
    } catch (e) {
      await fs.mkdirSync(path.dirname(filePath), { recursive: true })
      try {
        await writeFile(filePath, data)
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
