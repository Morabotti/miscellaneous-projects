import { useState, useCallback } from 'react'
import { RequestContext } from '@types'

export const useInitialContext = (
  initialLoading: boolean,
  initialError: boolean
): RequestContext => {
  const [state, setState] = useState({
    loading: initialLoading,
    error: initialError
  })

  const setRequest = useCallback((setLoading: boolean, setError = false) => setState({
    loading: setLoading,
    error: setError
  }), [setState])

  return {
    error: state.error,
    loading: state.loading,
    setRequest
  }
}
