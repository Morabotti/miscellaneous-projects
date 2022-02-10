import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Application from '@/Application'

const mount = document.getElementById('mount')

const render = () => {
  if (!mount) {
    console.error('No mountpoint found')
    return
  }

  ReactDOM.render(<AppContainer><Application /></AppContainer>, mount)
}

render()

if (module.hot) {
  module.hot.accept('./Application', render)
}
