import React, { useState } from 'react'
import UpArrow from 'mdi-react/ChevronUpIcon'
import InfoCircle from 'mdi-react/InfoCircleIcon'
import CogIcon from 'mdi-react/CogIcon'
import Calendar from 'mdi-react/CalendarIcon'
import { useRouter, useAppContext } from '../../hooks'

interface Props {
  group: string
}

export default ({
  group
}: Props) => {
  const { history } = useRouter()
  const { updateGroup } = useAppContext()
  const [ optionsOpen, setOptionsOpen ] = useState(false)

  const backToMainMenu = () => {
    updateGroup(null, null)
    history.replace('/')
  }

  return (
    <div className={`bottom-bar ${optionsOpen ? 'open' : ''}`}>
      <div
        className='bottom-button'
        onClick={() => setOptionsOpen(!optionsOpen)}
      >
        <span>{group}</span><UpArrow />
      </div>
      <div className='bottom-content'>
        <div
          className='bottom-grid'
          onClick={() => history.push('/info')}
        >
          <InfoCircle />
          <p>INFO</p>
        </div>
        <div
          className='bottom-grid'
          onClick={backToMainMenu}
        >
          <Calendar />
          <p>START MENU</p>
        </div>
        <div
          className='bottom-grid'
          onClick={() => history.push('/settings')}
        >
          <CogIcon />
          <p>SETTINGS</p>
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
