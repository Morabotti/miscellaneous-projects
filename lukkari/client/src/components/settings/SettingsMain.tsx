import React from 'react'
import CogIcon from 'mdi-react/CogIcon'
import { useAppContext } from '@hooks'
import { TabNavigation } from '@components/common'
import { styles } from '@enums'
import { SettingsGroup } from '.'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import ReactGA from 'react-ga'

const SettingsMain = () => {
  const { department, group, settings, changeSettings } = useAppContext()
  const { replace, goBack } = useHistory()
  const { t } = useTranslation('settings')

  const navigateBack = () => {
    if (department === null || group === null) {
      goBack()
    }
    else {
      replace(`/schedule/${department}/${group}/`)
    }
  }

  ReactGA.modalview('/settings')

  return (
    <TabNavigation
      logo={<CogIcon />}
      header={t('header')}
      back={navigateBack}
    >
      {settings !== null ? (
        <>
          <SettingsGroup
            header={t('optionStyle')}
            options={styles}
            selected={settings.style}
            onSelect={value => changeSettings('style', value)}
          />
          <SettingsGroup
            header={t('optionTheme')}
            options={['default', 'dark']}
            selected={settings.theme}
            onSelect={value => changeSettings('theme', value)}
          />
          <SettingsGroup
            header={t('optionMap')}
            options={['true', 'false']}
            selected={settings.useMap ? 'true' : 'false'}
            onSelect={value => changeSettings('useMap', value === 'true')}
          />
          <SettingsGroup
            header={t('optionLang')}
            options={['en', 'fi']}
            selected={settings.lang}
            onSelect={value => changeSettings('lang', value)}
          />
        </>
      ) : <h2>{t('loading')}</h2> }
    </TabNavigation>
  )
}

export default SettingsMain
