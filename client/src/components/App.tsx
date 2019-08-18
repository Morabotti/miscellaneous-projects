import React, { PureComponent } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { AppProvider } from '../hooks/useAppContext'

import { EntryMain } from './entry'
import { ScheduleMain } from './schedule'
import { SettingsMain } from './settings'
import { InfoMain } from './info'

import '../index.less'

class App extends PureComponent<{}> {
  render () {
    return (
      <AppProvider>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={EntryMain} />
            <Route path='/schedule/:department/:id' component={ScheduleMain} />
            <Route path='/settings' component={SettingsMain} />
            <Route path='/info' component={InfoMain} />
          </Switch>
        </BrowserRouter>
      </AppProvider>
    )
  }
}

export default hot(module)(App)
