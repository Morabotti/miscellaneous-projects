import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Container } from '@material-ui/core'

import reducer from '../reducer'
import { HelloWorld } from './'

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__
    && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)
const replace = () => {
  const nextReducer: any = require('../reducer')
  store.replaceReducer(nextReducer)
}

if (module.hot) {
  module.hot.accept('../reducer', replace)
}

class App extends React.PureComponent<{}> {
  render () {
    return (
      <Provider store={store}>
        <Container>
          <HelloWorld />
        </Container>
      </Provider>
    )
  }
}

export default hot(module)(App)
