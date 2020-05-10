import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useCallback
} from 'react'

import { useSnackbar } from 'notistack'
import { Action, NotificationType } from '@types'

export interface GlobalState {
  loading: boolean,
  actionLoading: boolean,
  dashboardContainer: boolean
}

interface ApplicationContext {
  state: GlobalState,
  dispatch: (action: Action) => void,
  createNotification: (message: string, type?: NotificationType) => void
}

interface Props {
  children: ReactNode
}

const initialState: GlobalState = {
  loading: false,
  actionLoading: false,
  dashboardContainer: true
}

export const __ApplicationContext = createContext<ApplicationContext>({
  state: initialState,
  dispatch: () => {},
  createNotification: () => {}
})

const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'set-loading':
      return {
        ...state,
        loading: action.loading
      }
    case 'set-action-loading':
      return {
        ...state,
        actionLoading: action.actionLoading
      }
    default:
      throw new Error('No reducer action set!')
  }
}

export const ApplicationProvider = ({ children }: Props) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const { enqueueSnackbar } = useSnackbar()

  const createNotification = useCallback((message: string, type?: NotificationType) => {
    enqueueSnackbar(message, { variant: type || 'default' })
  }, [enqueueSnackbar])

  return (
    <__ApplicationContext.Provider
      value={{
        state,
        dispatch,
        createNotification
      }}
    >
      {children}
    </__ApplicationContext.Provider>
  )
}

export const useApplication = (): ApplicationContext => useContext(__ApplicationContext)
