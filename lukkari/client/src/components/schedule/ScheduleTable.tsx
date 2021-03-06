import React, { useState } from 'react'
import { days, times, PREFIX } from '@enums'
import { Week, ScheduleEvent } from '@types'
import { TableOutlines, Event, EventModal } from '.'
import { dateFromDay } from '@util/time'
import { useAppContext } from '@hooks'
import { SwipeableHandlers } from 'react-swipeable/types'
import { useTranslation } from 'react-i18next'

interface Props {
  activeWeek: Week | null,
  fullYear: number,
  swiper: SwipeableHandlers
}

const ScheduleTable = ({
  activeWeek,
  fullYear,
  swiper
}: Props) => {
  const { t } = useTranslation('schedule')
  const { settings } = useAppContext()
  const [ activeClass, setActiveClass ] = useState<null | ScheduleEvent>(null)

  if (activeWeek === null) {
    return (
      <div className='loader-container'>
        <div className='custom-loader' />
      </div>
    )
  }

  const hasExtraDay = activeWeek.weekData.filter(i => i.day === 6 && i.valid).length !== 0
    ? 'extra-day'
    : ''

  return (
    <>
      <div {...swiper} className={`grid-container ${hasExtraDay}`}>
        <div className={`grid-header ${hasExtraDay}`}>
          <div className='day settings' />
          {days.map((d, i) => {
            const c = dateFromDay(
              fullYear,
              activeWeek.weekNum * 7 - PREFIX + i
            )
            return (
              <div key={d} className={`day ${d}`}>
                {t(d)}
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
          {activeWeek && activeWeek.weekData
            .filter(i => i.valid)
            .map((event, i) => (
              <Event
                key={i}
                event={event}
                style={settings ? settings.style : 'classic'}
                onSelect={event => setActiveClass(event)}
              />
            ))}
        </div>
        <TableOutlines
          style={settings ? settings.style : 'classic'}
          extraDay={hasExtraDay}
        />
      </div>
      {activeClass !== null && (
        <EventModal
          isOpen={activeClass !== null}
          onClose={() => setActiveClass(null)}
          event={activeClass}
          week={activeWeek}
        />
      )}
    </>
  )
}

export default ScheduleTable
