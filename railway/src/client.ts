import axios from 'axios'
import { TrainResponse, LocationResponse } from './types'

export const fetchLocations = (): Promise<LocationResponse> => axios.get(
  'https://rata.digitraffic.fi/api/v1/metadata/stations'
)

export const fetchTrains = (): Promise<TrainResponse> => axios.get(
  'https://rata.digitraffic.fi/api/v1/train-locations/latest/'
)
