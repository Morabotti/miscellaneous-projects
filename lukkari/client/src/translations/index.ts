import i18next from 'i18next'
import { LANGUAGE } from '@enums'

import * as english from './en'
import * as finnish from './fi'

export const saveLanguage = (lang: string) => {
  i18next.changeLanguage(lang)
  window.localStorage.setItem(LANGUAGE, lang)
}

export default () => {
  i18next.init({
    interpolation: { escapeValue: false },
    lng: window.localStorage.getItem(LANGUAGE) || 'fi',
    resources: {
      en: {
        common: english.common,
        home: english.home,
        info: english.info,
        schedule: english.schedule,
        settings: english.settings
      },
      fi: {
        common: finnish.common,
        home: finnish.home,
        info: finnish.info,
        schedule: finnish.schedule,
        settings: finnish.settings
      }
    }
  })

  return i18next
}
