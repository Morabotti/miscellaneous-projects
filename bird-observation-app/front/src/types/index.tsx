export interface Bird {
  id: number,
  textid: string,
  finnish: string,
  latin: string,
  swedish: string,
  english: string
}

export interface Observation {
  id: number,
  bird: number,
  place: string,
  time: string,
  user: string
}

export type NewObservation = Omit<Observation, 'id'>
