import { Classes, Week } from './types'

const checkResponse = (res: Response): Response => {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export const fetchDepartments = (): Promise<string[]> => fetch(
  '/api/departments',
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
  `/api/classes/${department}`,
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
  `/api/schedule/${department}/${id}`,
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())
