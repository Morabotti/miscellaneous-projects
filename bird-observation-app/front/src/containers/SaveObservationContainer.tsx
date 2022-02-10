import React from 'react'
import { useCreateObservation } from '@hooks'
import { ChevronLeft } from 'mdi-material-ui'

import {
  ApplicationContainer,
  ApplicationSection,
  SaveObservationForm,
  ActionButton
} from '@components'

export const SaveObservationContainer = () => {
  const { birds, onBackPush, onSaveObservation } = useCreateObservation()

  return (
    <ApplicationContainer>
      <ApplicationSection title='Save observation'>
        <SaveObservationForm
          birds={birds}
          onBackPush={onBackPush}
          onSaveObservation={onSaveObservation}
        />
      </ApplicationSection>
      <ActionButton
        onClick={onBackPush}
        icon={ChevronLeft}
        title='Back to listings'
      />
    </ApplicationContainer>
  )
}
