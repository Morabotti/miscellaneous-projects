import * as jsonfile from 'jsonfile'
import { Classes, Week } from '../types'

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