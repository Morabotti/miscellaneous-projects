import { Action } from './actions'

export interface ApplicationState {
  text: string
}

const getDefaultState = () => ({
  text: ''
})

export default function reducer (
  state: ApplicationState = getDefaultState(),
  action: Action
): ApplicationState {
  switch (action.type) {
    case 'text-set':
      return { ...state, text: action.text }
    default:
      return state
  }
}
