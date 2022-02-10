import { AxiosResponse } from 'axios';

export interface Location {
  passengerTraffic: boolean,
  type: string
  stationName: string
  stationShortCode: string
  stationUICCode: number
  countryCode: string
  longitude: number
  latitude: number
}

export interface TrainLocation {
  type: string,
  coordinates: [number, number]
}

export interface Train {
  trainNumber: number
  departureDate: string
  timestamp: string
  location: TrainLocation
  speed: number
}

export type LocationResponse = AxiosResponse<Location[]>
export type TrainResponse = AxiosResponse<Train[]>
