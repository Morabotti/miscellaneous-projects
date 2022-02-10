import React, { useState, useEffect, useCallback } from 'react'
import * as client from './client'
import { Train, Location } from './types'
import useInterval from './useInterval'
import './index.css'

import { Map, Table } from './components'

const majorStops = ['VS', 'TPE', 'TKU', 'HKI', 'SK', 'JY', 'PRI', 'KOK', 'OL', 'PM', 'KAJ', 'JNS', 'KEM', 'ROI']

interface State {
  minorLocations: Location[],
  trains: Train[],
  majorLocations: Location[],
  updatedTime: string
}

const App = () => {
  const [state, setState] = useState<State>({
    minorLocations: [],
    majorLocations: [],
    trains: [],
    updatedTime: new Date().toLocaleTimeString()
  })

  const fetchInitials = useCallback(() => {
    Promise.all([
      client.fetchLocations(),
      client.fetchTrains()
    ])
      .then(res => {
        setState({
          trains: res[1].data,
          minorLocations: res[0].data.filter(i => majorStops.indexOf(i.stationShortCode) === -1),
          majorLocations: res[0].data.filter(i => majorStops.indexOf(i.stationShortCode) !== -1),
          updatedTime: new Date().toLocaleTimeString()
        })
      })
  }, [setState])

  const getTrains = () => {
    client.fetchTrains()
      .then(res => {
        setState({
          ...state,
          trains: res.data,
          updatedTime: new Date().toLocaleTimeString()
        })
      })
  }

  useEffect(() => {
    fetchInitials()
  }, [fetchInitials])

  useInterval(() => {
    getTrains()
  }, 5000)


  console.log(state.majorLocations)
  return (
    <div className='app'>
      <Map
        minorLocations={state.minorLocations}
        majorLocations={state.majorLocations}
        trains={state.trains}
        time={state.updatedTime}
      />
      <Table
        locations={[...state.majorLocations, ...state.minorLocations]}
      />
    </div>
  )
}

export default App
