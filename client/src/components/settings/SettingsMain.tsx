import React from 'react'
import CogIcon from 'mdi-react/CogIcon'
import { useSettings, useRouter, useAppContext } from '../../hooks'
import { TabNavigation } from '../common'
import { styles } from '../../enum'
import { SettingsGroup } from '.'

export default () => {
  const { settings, changeSettings } = useSettings()
  const { department, group } = useAppContext()
  const { history } = useRouter()

  const goBack = () => {
    if (department === null || group === null) {
      history.goBack()
    }
    else {
      history.push(`/schedule/${department}/${group}/`)
    }
  }

  return (
    <TabNavigation
      logo={<CogIcon />}
      header='Settings'
      back={goBack}
    >
      {settings !== null ? (
        <>
          <SettingsGroup
            header='Lukujärjestys tyyli'
            options={styles}
            selected={settings.style}
            onSelect={value => changeSettings('style', value)}
          />
          <SettingsGroup
            header='Teema'
            options={['default', 'dark']}
            selected={settings.theme}
            onSelect={value => changeSettings('theme', value)}
          />
          <SettingsGroup
            header='Näytä kartta'
            options={['true', 'false']}
            selected={settings.theme ? 'true' : 'false'}
            onSelect={value => changeSettings('theme', value === 'true')}
          />
        </>
      ) : <h2>Loading...</h2> }
    </TabNavigation>
  )
}
