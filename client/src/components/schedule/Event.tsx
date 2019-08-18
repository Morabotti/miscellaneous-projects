import React from 'react'
import { ScheduleStyle, ScheduleEvent } from '../../types'

interface Props {
  event: ScheduleEvent,
  style: ScheduleStyle
}

export default ({
  event: { day, length, time, title },
  style
}: Props) => (
  <div
    className={`event ${style}`}
    style={{
      gridColumn: `${day} / span 1`,
      gridRow: `${time - 2} / span ${length}`
    }}
  >
    <div className='event-top'>
      {title}
    </div>
    <div className='event-bottom' />
    <div className='event-align' />
  </div>
)
