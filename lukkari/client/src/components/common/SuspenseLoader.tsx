import React from 'react'
import { useTranslation } from 'react-i18next'

const SuspenseLoader = () => {
  const { t } = useTranslation('common')

  return (
    <div className='suspense-loader'>
      <div className='suspense-center'>
        <img src='/assets/favicon/favicon-192x192.png' alt='icon' />
        <h1>VAMK {t('title')}</h1>
        <h2>{t('loading')}</h2>
      </div>
    </div>
  )
}

export default SuspenseLoader
