import React from 'react'
import InfoIcon from 'mdi-react/InfoCircleIcon'
import { useRouter, useAppContext } from '../../hooks'
import { TabNavigation } from '../common'

export default () => {
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
      logo={<InfoIcon />}
      header='Info'
      back={goBack}
    >
      <h2 />
    </TabNavigation>
  )
}
