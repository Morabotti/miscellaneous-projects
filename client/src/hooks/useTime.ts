import { useState } from 'react'
import { TimeData } from '@types'
import { getWeekNumber } from '@util/time'

export const useTime = (): TimeData => {
  const [ time ] = useState<TimeData>(getWeekNumber(new Date()))

  return time
}
