import React, { useContext, useState, ReactNode } from 'react'
import { Settings } from '../types'
import { DEPARTMENT, GROUP } from '../enum'
import { useSettings } from '.'

interface AppContext {
  department: string | null,
  group: string | null,
  settings: null | Settings,
  updateGroup: (department: string|null, group: string|null) => void,
  changeSettings: (key: string, value: string | boolean) => void
}

export const __AppContext = React.createContext<AppContext>({
  department: localStorage.getItem(DEPARTMENT),
  group: localStorage.getItem(GROUP),
  settings: null,
  updateGroup: () => {},
  changeSettings: () => {}
})

interface Props {
  children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  const { settings, changeSettings } = useSettings()
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
        updateGroup,
        settings,
        changeSettings
      }}
    >
      <div className={`theme ${settings ? settings.theme : 'default'}`}>
        {children}
      </div>
    </__AppContext.Provider>
  )
}

export const useAppContext = (): AppContext => useContext(__AppContext)
