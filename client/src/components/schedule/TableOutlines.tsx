import React from 'react'
import { ScheduleStyle } from '../../types'

interface Props {
  style: ScheduleStyle,
  extraDay: string
}

export default ({
  style,
  extraDay
}: Props) => (
  <div className={`grid-outlines ${extraDay} ${style}`}>
    {[...Array(extraDay ? 6 * 13 : 5 * 13)].map((_, i) => (
      <div key={i} />
    ))}
  </div>
)
