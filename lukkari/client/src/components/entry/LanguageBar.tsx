import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppContext } from '@hooks'

const LanguageBar = () => {
  const { t, i18n } = useTranslation('home')
  const { changeSettings } = useAppContext()

  return (
    <div className='language-bar'>
      <div
        className={`block ${i18n.language === 'fi' ? 'active' : ''}`}
        onClick={() => changeSettings('lang', 'fi')}
      >
        <img src='/assets/flags/fi.svg' alt='fi-flag' />
        {t('fi')}
      </div>
      <div
        className={`block ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeSettings('lang', 'en')}
      >
        <img src='/assets/flags/en.svg' alt='en-flag' />
        {t('en')}
      </div>
    </div>
  )
}

export default LanguageBar
