import { Bird, NewObservation } from '@types'
import { useApplicationContext } from '@hooks'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { createObservation } from '@controllers'

interface UseCreateObservationContext {
  birds: Bird[],
  onBackPush: () => void,
  onSaveObservation: (obs: NewObservation) => Promise<void>
}

export const useCreateObservation = (): UseCreateObservationContext => {
  const { birds } = useApplicationContext()
  const { push } = useHistory()

  const onBackPush = useCallback(() => {
    push('/')
  }, [push])

  const onSaveObservation = useCallback(async (set: NewObservation) => {
    const data = await createObservation(set)
    console.log(data)
    push('/')
  }, [push])

  return {
    birds,
    onBackPush,
    onSaveObservation
  }
}
