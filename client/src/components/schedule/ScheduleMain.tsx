import React, { useEffect } from 'react'
import { useSchedule, useTime, useAppContext } from '../../hooks'

import {
  ScheduleTable,
  Navigation,
  BottomBar
} from '.'

interface Props {
  match: {
    params: {
      department: string,
      id: string
    }
  }
}

export default ({
  match: { params: { department, id } }
}: Props) => {
  const {
    activeSchedule,
    fullSchedule,
    changeWeek
  } = useSchedule(department, id)
  const time = useTime()
  const { updateGroup } = useAppContext()

  useEffect(() => {
    updateGroup(department, id)
  }, [])

  return (
    <div>
      <Navigation
        activeWeek={activeSchedule}
        changeWeek={changeWeek}
        fullYear={time.fullYear}
        fullWeeks={fullSchedule}
      />
      <ScheduleTable
        activeWeek={activeSchedule}
        fullYear={time.fullYear}
      />
      <BottomBar
        group={id}
      />
    </div>
  )
}
