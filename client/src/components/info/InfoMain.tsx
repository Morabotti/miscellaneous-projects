import React from 'react'
import InfoIcon from 'mdi-react/InfoCircleIcon'
import { useAppContext } from '../../hooks'
import { TabNavigation } from '../common'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import ReactGA from 'react-ga'

const InfoMain = () => {
  const { department, group } = useAppContext()
  const { t } = useTranslation('info')
  const { goBack, replace } = useHistory()

  const navigateBack = () => {
    if (department === null || group === null) {
      goBack()
    }
    else {
      replace(`/schedule/${department}/${group}/`)
    }
  }

  ReactGA.modalview('/info')

  return (
    <TabNavigation
      logo={<InfoIcon />}
      header={t('header')}
      back={navigateBack}
    >
      <h2 />
    </TabNavigation>
  )
}

export default InfoMain
