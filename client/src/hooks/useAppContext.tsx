import React, { useContext, useState, ReactNode } from 'react'
import { DEPARTMENT, GROUP } from '../enum'

interface AppContext {
  department: string | null,
  group: string | null,
  updateGroup: (department: string|null, group: string|null) => void
}

export const __AppContext = React.createContext<AppContext>({
  department: localStorage.getItem(DEPARTMENT),
  group: localStorage.getItem(GROUP),
  updateGroup: () => {}
})

interface Props {
  children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  const [department, setDepartment] = useState(localStorage.getItem(DEPARTMENT))
  const [group, setGroup] = useState(localStorage.getItem(GROUP))

  const updateGroup = (department: string|null, group: string|null) => {
    setDepartment(department)
    setGroup(group)

    if (department === null || group === null) {
      localStorage.removeItem(DEPARTMENT)
      localStorage.removeItem(GROUP)
    }
    else {
      localStorage.setItem(DEPARTMENT, department)
      localStorage.setItem(GROUP, group)
    }
  }

  return (
    <__AppContext.Provider
      value={{
        department,
        group,
        updateGroup
      }}
    >
      {children}
    </__AppContext.Provider>
  )
}

export const useAppContext = (): AppContext => useContext(__AppContext)
