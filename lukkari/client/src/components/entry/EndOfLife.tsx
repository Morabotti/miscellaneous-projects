import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

const EndOfLife = () => {
  const { t } = useTranslation('home')

  const openSchedule = useCallback(() => {
    window.location.replace('https://lukkarit.vamk.fi/')
  }, [])

  return (
    <div className='main-container'>
      <div className='wrap'>
        <h1 className='main-title'>
          <span>VAMK </span>
          {t('title')}
        </h1>
        <h1>{t('eol-title')}</h1>
        <h3>{t('eol-description')}</h3>
        <div className='submit-box'>
          <button
            className='submit-button'
            onClick={openSchedule}
          >{t('eol-open')}</button>
        </div>
      </div>
    </div>
  )
}

export default EndOfLife
