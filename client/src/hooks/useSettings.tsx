import { useState, useEffect } from 'react'
import { Settings } from '../types'
import { SETTINGS } from '../enum'

interface SettingsContext {
  settings: Settings | null,
  changeSettings: (key: string, value: string | boolean) => void
}

const initialSettings = (): Settings => ({
  style: 'classic',
  theme: 'default',
  useMap: true
})

export const useSettings = (): SettingsContext => {
  const [ settings, setSettings ] = useState<Settings | null>(null)

  const loadOrCreateSettings = () => {
    const memory = localStorage.getItem(SETTINGS)
    if (memory === null) {
      localStorage.setItem(SETTINGS, JSON.stringify(initialSettings()))
    }
    else {
      const parsed = JSON.parse(memory)
      setSettings(parsed)
    }
  }

  const changeSettings = (key: string, value: string | boolean) => {
    if (settings === null) {
      return
    }
    const updated = { ...settings, [key]: value }
    setSettings(updated)
    localStorage.setItem(SETTINGS, JSON.stringify(updated))
  }

  useEffect(() => {
    loadOrCreateSettings()
  }, [])

  return {
    settings,
    changeSettings
  }
}
