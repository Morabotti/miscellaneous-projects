import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from '@components/App'

const mount = document.getElementById('mount')
const render = () => {
  if (!mount) {
    console.error('No mountpoint found!')
    return
  }

  ReactDOM.render(<AppContainer><App /></AppContainer>, mount)
}

render()

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => {})
}

if (module.hot) {
  module.hot.accept('./components/App', render)
}
