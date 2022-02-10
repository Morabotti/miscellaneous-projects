import { Bird, NewObservation, Observation } from '@types'

export const checkResponse = (res: Response): Promise<Response> => {
  if (!res.ok) {
    return res.text()
      .then((text) => {
        try {
          const jsonError = JSON.parse(text)
          if (jsonError.message) {
            return jsonError.message
          }
          return text
        }
        catch (_) {
          return text
        }
      })
      .then((message) => Promise.reject(new Error(`${message} (HTTP ${res.status.toString()})`)))
  }
  return Promise.resolve(res)
}

export const getBirds = (): Promise<Bird[]> => fetch(
  `/api/bird`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const createObservation = (observation: NewObservation): Promise<Observation> => fetch(
  `/api/observation`,
  {
    method: 'POST',
    body: JSON.stringify(observation),
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(checkResponse)
  .then((res) => res.json())
