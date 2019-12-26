import { Classes, Week, Teacher, Room } from './types'

const checkResponse = (res: Response): Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const fetchDepartments = (): Promise<string[]> => fetch(
  '/api/schedule/departments',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const fetchClasses = (
  department: string
): Promise<Classes[]> => fetch(
  `/api/schedule/classes/${department}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const fetchSchedule = (
  department: string,
  id: string
): Promise<Week[]> => fetch(
  `/api/schedule/vamk/${department}/${id}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const fetchTeacher = (
  teacher: string
): Promise<Teacher> => fetch(
  `/api/schedule/teacher/${teacher}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const fetchRoom = (
  room: string
): Promise<Room> => fetch(
  `/api/schedule/location/${room}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const sendReport = (
  group: string,
  week: number
): Promise<Response> => fetch(
  `/api/schedule/report/vamk/${group}/${week}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
