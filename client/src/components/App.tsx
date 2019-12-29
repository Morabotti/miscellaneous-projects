import React, { PureComponent, Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { AppProvider } from '../hooks/useAppContext'
import { SuspenseLoader } from './common'

import '../index.less'

const EntryMain = lazy(() => import(/* webpackPreload: true */'./entry/EntryMain'))
const ScheduleMain = lazy(() => import(/* webpackPreload: true */'./schedule/ScheduleMain'))
const SettingsMain = lazy(() => import('./settings/SettingsMain'))
const InfoMain = lazy(() => import('./info/InfoMain'))

class App extends PureComponent<{}> {
  render () {
    return (
      <AppProvider>
        <BrowserRouter>
          <Suspense fallback={<SuspenseLoader />}>
            <Switch>
              <Route path='/' exact component={EntryMain} />
              <Route path='/schedule/:department/:id' component={ScheduleMain} />
              <Route path='/settings' component={SettingsMain} />
              <Route path='/info' component={InfoMain} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AppProvider>
    )
  }
}

export default hot(module)(App)
