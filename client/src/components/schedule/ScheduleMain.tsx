import React, { useEffect } from 'react'
import { useSchedule, useTime, useAppContext } from '../../hooks'
import { useSwipeable } from 'react-swipeable'

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

  const swiper = useSwipeable({ onSwipedRight: () => {
    if (activeSchedule) {
      changeWeek(activeSchedule.weekNum - 1)
    }
  },
  onSwipedLeft: () => {
    if (activeSchedule) {
      changeWeek(activeSchedule.weekNum + 1)
    }
  } })

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
        swiper={swiper}
        activeWeek={activeSchedule}
        fullYear={time.fullYear}
      />
      <BottomBar
        group={id}
      />
    </div>
  )
}
