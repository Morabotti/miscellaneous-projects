import React, { memo } from 'react'
import { ScheduleStyle } from '../../types'

interface Props {
  style: ScheduleStyle,
  extraDay: string
}

const TableOutlines = ({
  style,
  extraDay
}: Props) => (
  <div className={`grid-outlines ${extraDay} ${style}`}>
    {[...Array(extraDay ? 6 * 13 : 5 * 13)].map((_, i) => (
      <div key={i} />
    ))}
  </div>
)

export default memo(TableOutlines)
