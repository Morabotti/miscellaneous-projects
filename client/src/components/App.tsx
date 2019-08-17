import React, { PureComponent } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import { EntryMain } from './entry'
import { ScheduleMain } from './schedule'

import '../index.less'

class App extends PureComponent<{}> {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={EntryMain} />
          <Route path='/schedule/:department/:id' component={ScheduleMain} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default hot(module)(App)
