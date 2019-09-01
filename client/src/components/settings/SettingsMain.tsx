import React from 'react'
import CogIcon from 'mdi-react/CogIcon'
import { useRouter, useAppContext } from '../../hooks'
import { TabNavigation } from '../common'
import { styles } from '../../enum'
import { SettingsGroup } from '.'

export default () => {
  const { department, group, settings, changeSettings } = useAppContext()
  const { history } = useRouter()

  const goBack = () => {
    if (department === null || group === null) {
      history.goBack()
    }
    else {
      history.replace(`/schedule/${department}/${group}/`)
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
            selected={settings.useMap ? 'true' : 'false'}
            onSelect={value => changeSettings('useMap', value === 'true')}
          />
        </>
      ) : <h2>Loading...</h2> }
    </TabNavigation>
  )
}
