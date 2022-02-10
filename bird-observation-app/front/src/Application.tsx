import React, { FC } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ListObservationContainer, SaveObservationContainer } from '@containers'
import { ApplicationProviders } from '@components'

const Application: FC = () => (
  <ApplicationProviders>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <ListObservationContainer />
        </Route>
        <Route path='/new' exact>
          <SaveObservationContainer />
        </Route>
      </Switch>
    </BrowserRouter>
  </ApplicationProviders>
)

export default hot(module)(Application)
