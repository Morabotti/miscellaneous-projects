import * as jsonfile from 'jsonfile'
import { Classes, Week, Teacher, Room } from '../types'
import { getTeacherFromVamk } from './TeacherService'

export const getDepartments = async () => {
  return ['tekniikka']
}

export const getClasses = (
  department: string
) => {
  const file = `./db/departments/${department}.json`
  return new Promise((resolve, reject) => {
    jsonfile.readFile(file, (err, classes: Classes[]) => {
      if (err) reject(err)
      resolve(classes)
    })
  })
}

export const getSchedule = (
  department: string,
  id: string
) => {
  const file = `./db/schedule/${department}/${id}.json`
  return new Promise((resolve, reject) => {
    jsonfile.readFile(file, (err, classes: Week[]) => {
      if (err) reject(err)
      resolve(classes)
    })
  })
}

export const getTeacher = (
  id: string
): Promise<Teacher> => {
  const file = './db/teachers/vamk.json'

  return new Promise((resolve, reject) => {
    jsonfile.readFile(file, (err, teachers: Teacher[]) => {
      if (err || teachers === undefined || teachers.length === 0) {
        return getTeacherFromVamk(id)
          .then(teacher => {
            jsonfile.writeFileSync(file, [teacher])
            return resolve(teacher)
          })
      }

      const teacher = teachers.find(t => t.id === id)

      if (teacher) {
        resolve(teacher)
      } else {
        getTeacherFromVamk(id)
          .then(res => {
            jsonfile.writeFileSync(file, [ ...teachers, res ])
            resolve(res)
          })
      }
    })
  })
}

export const getRoom = (
  id: string
): Promise<Room> => {
  const file = './db/locations/vamk.json'

  return new Promise((resolve, reject) => {
    jsonfile.readFile(file, (err, rooms: Room[]) => {
      if (err || rooms === undefined) {
        return reject()
      }

      const room = rooms.find(r => r.name === id)

      if (room) {
        resolve(room)
      } else {
        reject()
      }
    })
  })
}