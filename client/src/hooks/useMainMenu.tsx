import { useState, ChangeEvent, useEffect } from 'react'
import * as client from '../client'
import { Classes } from '../types'

interface MainMenuContext {
  schools: string[],
  departments: string[] | null,
  classes: Classes[] | null,
  selectedSchool: string,
  selectedDepartment: string,
  selectedClass: string,
  changeSchool: (e: ChangeEvent<HTMLSelectElement>) => void,
  changeDepartment: (e: ChangeEvent<HTMLSelectElement>) => void,
  changeClass: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const useMainMenu = (): MainMenuContext => {
  const [schools] = useState<string[]>(['vamk'])
  const [departments, setDepartments] = useState<null | string[]>(null)
  const [classes, setClasses] = useState<null | Classes[]>(null)
  const [selectedSchool] = useState('vamk')
  const [selectedDepartment, setSelectedDepartment] = useState('tekniikka')
  const [selectedClass, setSelectedClass] = useState('I-ET-1N1')

  const changeSchool = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e)
  }

  const changeDepartment = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value
    setSelectedDepartment(value)
    client.fetchClasses(value)
      .then(setClasses)
  }

  const changeClass = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.currentTarget.value)
  }

  useEffect(() => {
    client.fetchDepartments()
      .then(dep => {
        setDepartments(dep)
        return client.fetchClasses(selectedDepartment)
      })
      .then(setClasses)
  }, [])

  return {
    schools,
    departments,
    classes,
    selectedSchool,
    selectedDepartment,
    selectedClass,
    changeSchool,
    changeDepartment,
    changeClass
  }
}
