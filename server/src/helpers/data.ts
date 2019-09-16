import { ScheduleEvent } from '../types'

export const hasNumber = (string: string) => {
  return /\d/.test(string)
}

export const isDigit = (n: string) => {
  return Boolean([true, true, true, true, true, true, true, true, true, true][n])
}

export const getTeacher = (data: string[]): null | string => {
  for (const d of data) {
    if (d.length >= 2 && d.length <= 4 && !hasNumber(d)) {
      return d
    }

    if (d.indexOf('VY') == 0 && !hasNumber(d)) {
      if (d.length >= 4 && d.length <= 5) {
        return d
      }
    }
  }
  return null
}

export const getGroups = (
  data: string[]
): string[] => data.filter(e => (
  e.indexOf('I-') == 0 ||
  e.indexOf('T-') == 0 ||
  e.indexOf('S-') == 0 ||
  e.indexOf('VY-') == 0
))

export const getRoom = (
  data: string[]
): string | null => {
  for (const e of data) {
    const hasExtra = e.indexOf('(')
    const place = hasExtra > -1 ? e.slice(0, hasExtra) : e

    if (place.length <= 12) {
      if ((place.charAt(0) == 'A' && place.indexOf('Alere') != 0)
        || place.charAt(0) == 'B'
        || place.charAt(0) == 'C'
        || place.charAt(0) == 'F'
      ) {
        if (isDigit(place.charAt(1))) {
          return place
        }
      }
      else if (
        place.indexOf('LEC') == 0 ||
        place.indexOf('TF') == 0 ||
        place.indexOf('LEP') == 0 ||
        place.indexOf('UVA') == 0 ||
        place.indexOf('Alere') == 0
      ) {
        return place
      }
      else if (place.indexOf('LM') == 0 && !isDigit(place.charAt(2)) && !isDigit(place.charAt(3))) {
        return place
      }
    }
    else if(place.indexOf('Alere') == 0){
      return place;
    }
  }

  return null
}

/** 
 * * Calculate day with past data
 * @param events old events from same week
 * @param column initial column of the event (day), defaults to (-1)
 * @param row row of the item, defaults to (-2)
 */
export const calcDay = (events: ScheduleEvent[], column: number, row: number) => {
  let fetching = true
  let orginal = column;
  let latest = 0;

  while (fetching) {
    const adding = events.filter(e => e.day <= orginal && e.length - 1 + e.time >= row && e.time < row ).length
    if (latest !== adding) {
      orginal = orginal + (adding - latest)
      latest = adding
    } else {
      fetching = false
    }
  }
  return orginal
}

/*
 * OLD FETCH, WORKS 99%
export const calcDay = (events: ScheduleEvent[], column: number, row: number) => {
  let value = column
  let fix = 0

  const adding = events.filter(e => e.day <= column && e.length - 1 + e.time >= row && e.time < row )
  console.log(adding.length)

  let fetching = true
  for (const event of events) {
      if (event.day === value && event.length - 1 + event.time >= row && event.time < row) {
          value++
      }
  }

  while (fetching) {
      let orginal = fix
      for (const event of events) {
          if (event.day == (value + fix) && event.time <= row && event.length - 1 + event.time >= row) {
              fix++
          }
      }
      if (orginal !== fix) {
          fetching = true
      } else {
          fetching = false
      }
  }
  return value + fix
}
*/