import React, { useState, memo } from 'react'
import UpArrow from 'mdi-react/ChevronUpIcon'
import InfoCircle from 'mdi-react/InfoCircleIcon'
import CogIcon from 'mdi-react/CogIcon'
import Calendar from 'mdi-react/CalendarIcon'
import { useAppContext } from '@hooks'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'

interface Props {
  group: string | undefined
}

const BottomBar = ({
  group
}: Props) => {
  const { t } = useTranslation('schedule')
  const { replace, push } = useHistory()
  const { updateGroup } = useAppContext()
  const [ optionsOpen, setOptionsOpen ] = useState(false)

  const backToMainMenu = () => {
    updateGroup(null, null)
    replace('/')
  }

  return (
    <div className={`bottom-bar ${optionsOpen ? 'open' : ''}`}>
      <div
        className='bottom-button'
        onClick={() => setOptionsOpen(!optionsOpen)}
      >
        <span>{group || ''}</span><UpArrow />
      </div>
      <div className='bottom-content'>
        <div
          className='bottom-grid'
          onClick={() => push('/info')}
        >
          <InfoCircle />
          <p>{t('info')}</p>
        </div>
        <div
          className='bottom-grid'
          onClick={backToMainMenu}
        >
          <Calendar />
          <p>{t('start')}</p>
        </div>
        <div
          className='bottom-grid'
          onClick={() => push('/settings')}
        >
          <CogIcon />
          <p>{t('settings')}</p>
        </div>
      </div>
      <div
        className='bottom-bg'
        style={{ display: !optionsOpen ? 'none' : 'block' }}
        onClick={() => setOptionsOpen(false)}
      />
    </div>
  )
}

export default memo(BottomBar)
