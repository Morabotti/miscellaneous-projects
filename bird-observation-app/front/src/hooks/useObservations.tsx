import { Bird } from '@types'
import { useApplicationContext } from '@hooks'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

interface UseObservationsContext {
  birds: Bird[],
  onCreateObservation: () => void
}

export const useObservations = (): UseObservationsContext => {
  const { birds } = useApplicationContext()
  const { push } = useHistory()

  const onCreateObservation = useCallback(() => {
    push('/new')
  }, [push])

  return {
    birds,
    onCreateObservation
  }
}
