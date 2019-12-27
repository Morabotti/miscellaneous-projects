import { useState, ChangeEvent, useEffect } from 'react'
import * as client from '../client'
import { Classes, Department } from '../types'
import { DEPARTMENT, GROUP } from '../enum'

interface MainMenuContext {
  schools: string[],
  departments: Department[] | null,
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
  const [departments, setDepartments] = useState<null | Department[]>(null)
  const [classes, setClasses] = useState<null | Classes[]>(null)
  const [selectedSchool] = useState('vamk')
  const [selectedDepartment, setSelectedDepartment] = useState('technology')
  const [selectedClass, setSelectedClass] = useState('I-ET-1N1')

  const changeSchool = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e)
  }

  const changeDepartment = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value
    setSelectedDepartment(value)
    client.fetchClasses(value)
      .then(classes => {
        setClasses(classes)
        if (classes[0]) {
          setSelectedClass(classes[0].groupId)
        }
      })
  }

  const changeClass = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.currentTarget.value)
  }

  useEffect(() => {
    const dep = localStorage.getItem(DEPARTMENT)
    const id = localStorage.getItem(GROUP)
    if (!dep || !id) {
      client.fetchDepartments()
        .then(dep => {
          setDepartments(dep)
          return client.fetchClasses(selectedDepartment)
        })
        .then(setClasses)
    }
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
