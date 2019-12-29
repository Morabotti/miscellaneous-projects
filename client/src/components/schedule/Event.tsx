import React from 'react'
import { ScheduleStyle, ScheduleEvent } from '@types'

interface Props {
  event: ScheduleEvent,
  style: ScheduleStyle,
  onSelect: (event: ScheduleEvent) => void
}

const Event = ({
  event,
  style,
  onSelect
}: Props) => (
  <div
    className={`event ${style}`}
    style={{
      gridColumn: `${event.day} / span 1`,
      gridRow: `${event.time - 2} / span ${event.length}`
    }}
    onClick={() => onSelect(event)}
  >
    <div className='event-top'>
      {event.title}
    </div>
    <div className='event-bottom'>
      <span>{event.room}</span>
    </div>
  </div>
)

export default Event
