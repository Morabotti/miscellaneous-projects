import { Injectable, Logger } from '@nestjs/common'
import { Teacher, Group, Week, Room, Department } from '../app.types'
import * as request from 'request'
import * as cheerio from 'cheerio'
import { readFileSync, writeFile } from 'jsonfile'

@Injectable()
export class ScheduleService {
  private readonly dbPath = './db'
  private readonly logger = new Logger(ScheduleService.name)

  public async getDepartments(): Promise<Department[]> {
    return [
      { fi: 'tekniikka', en: 'technology' },
      { fi: 'sosiaali', en: 'social' },
      { fi: 'liiketalous', en: 'business' }
    ]
  }

  public async getClasses( department: string, source: string = 'vamk'): Promise<Group[] | null> {
    const filePath = `${this.dbPath}/${source}/department/${department}.json`

    try {
      const data: Group[] = await readFileSync(filePath)
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  public async getSchedule(
    department: string,
    groupId: string,
    source: string = 'vamk'
  ): Promise<Week[]> {
    const filePath = `${this.dbPath}/${source}/schedules/${department}/${groupId}.json`

    try {
      const data: Week[] = await readFileSync(filePath)
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  public async getTeacher(id: string, source: string = 'vamk'): Promise<Teacher> {
    const filePath = `${this.dbPath}/${source}/teachers.json`

    try {
      const teachers: Teacher[] = await readFileSync(filePath)
      const foundTeacher = teachers.find(i => i.id === id)

      if (!foundTeacher) {
        const teacher = await this.getTeacherFromVamk(id)
        writeFile(filePath, [...teachers, teacher])
        return teacher
      }

      return foundTeacher
    } catch (e) {
      throw new Error(e)
    }
  }

  public async getRoom(id: string, source: string = 'vamk'): Promise<Room> {
    const filePath = `${this.dbPath}/${source}/locations.json`

    try {
      const rooms: Room[] = await readFileSync(filePath)
      const room = rooms.find(i => i.name === id)

      if (!room) {
        throw new Error()
      }

      return room
    } catch (e) {
      throw new Error(e)
    }
  }

  public report(text: string) {
    this.logger.error(text)
  }

  private getTeacherFromVamk(id: string): Promise<Teacher> {
    return new Promise((resolve, reject) => {
      request(`http://www.puv.fi/fi/contact/?person=${id}`, (err, response, html) => {
        if (!err) {
          const $ = cheerio.load(html);
          const name = $('#main_content_right table tbody tr').children().eq(1).children().eq(0).text()
          if (name !== '') {
            return resolve({ id, name })
          } else {
            return reject()
          }
        } else {
          return reject()
        }
      })
    })
  }
}
