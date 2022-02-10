import React from 'react'

import { ApplicationContainer, ApplicationSection, ObservationList, ActionButton } from '@components'
import { useObservations } from '@hooks'
import { Plus } from 'mdi-material-ui'

export const ListObservationContainer = () => {
  const { birds, onCreateObservation } = useObservations()

  return (
    <ApplicationContainer>
      <ApplicationSection title='List of observations'>
        <ObservationList birds={birds} />
      </ApplicationSection>
      <ActionButton
        onClick={onCreateObservation}
        title='Add new observation'
        icon={Plus}
      />
    </ApplicationContainer>
  )
}
