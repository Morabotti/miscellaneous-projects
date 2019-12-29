import { useState, useEffect } from 'react'
import { updateTheme } from '@util/dom'
import { Settings } from '@types'
import { SETTINGS, LANGUAGE } from '@enums'
import { saveLanguage } from '@translations'

interface SettingsContext {
  settings: Settings | null,
  changeSettings: (key: string, value: string | boolean) => void
}

const initialSettings = (): Settings => ({
  style: 'classic',
  theme: 'default',
  lang: window.localStorage.getItem(LANGUAGE) || 'fi',
  useMap: true
})

export const useSettings = (): SettingsContext => {
  const [ settings, setSettings ] = useState<Settings | null>(null)

  const loadOrCreateSettings = () => {
    const memory = localStorage.getItem(SETTINGS)
    if (memory === null) {
      const initSettings = initialSettings()
      localStorage.setItem(SETTINGS, JSON.stringify(initSettings))
      setSettings(initSettings)
      updateTheme(initSettings.theme)
    }
    else {
      const parsed: Settings = JSON.parse(memory)
      setSettings(parsed)
      updateTheme(parsed.theme)
    }
  }

  const changeSettings = (key: string, value: string | boolean) => {
    if (settings === null) {
      return
    }
    const updated = { ...settings, [key]: value }
    setSettings(updated)
    updateTheme(updated.theme)
    localStorage.setItem(SETTINGS, JSON.stringify(updated))
  }

  useEffect(() => {
    loadOrCreateSettings()
  }, [])

  useEffect(() => {
    if (!settings) {
      return
    }
    saveLanguage(settings.lang)
  }, [settings && settings.lang])

  return {
    settings,
    changeSettings
  }
}
