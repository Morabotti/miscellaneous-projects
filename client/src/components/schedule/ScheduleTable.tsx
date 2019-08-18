import React from 'react'
import { days, times, PREFIX } from '../../enum'
import { Week } from '../../types'
import { TableOutlines, Event } from '.'
import { dateFromDay } from '../../helpers/time'
import { useSettings } from '../../hooks'

interface Props {
  activeWeek: Week | null,
  fullYear: number
}
export default ({
  activeWeek,
  fullYear
}: Props) => {
  const { settings } = useSettings()

  if (activeWeek === null) {
    // TODO: Create loaders
    return <div />
  }

  const hasExtraDay = activeWeek.weekData.filter(i => i.day === 6).length !== 0
    ? 'extra-day'
    : ''

  return (
    <div className={`grid-container ${hasExtraDay}`}>
      <div className={`grid-header ${hasExtraDay}`}>
        <div className='day settings' />
        {days.map((d, i) => {
          const c = dateFromDay(
            fullYear,
            activeWeek.weekNum * 7 - PREFIX + i
          )
          return (
            <div key={d} className={`day ${d}`}>
              {d.toUpperCase()}
              <br />
              <span className='date'>{`${c.getDate()}.${c.getMonth() + 1}.`}</span>
            </div>
          )
        })}
      </div>
      <div className='grid-time'>
        {times.map((t, i) => (
          <div className='time' key={i}>
            {t.from}-<br />{t.to}
          </div>
        ))}
      </div>
      <div className={`grid-data ${hasExtraDay}`}>
        {activeWeek && activeWeek.weekData.map((event, i) => (
          <Event
            key={i}
            event={event}
            style={settings ? settings.style : 'classic'}
          />
        ))}
      </div>
      <TableOutlines
        style={settings ? settings.style : 'classic'}
        extraDay={hasExtraDay}
      />
    </div>
  )
}
