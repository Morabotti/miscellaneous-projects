import React, { useEffect } from 'react'
import { useSchedule, useTime, useAppContext } from '@hooks'
import { useSwipeable } from 'react-swipeable'
import { useParams } from 'react-router'
import { ScheduleTable, Navigation, BottomBar } from '.'

const ScheduleMain = () => {
  const { department, id } = useParams()
  const { activeSchedule, fullSchedule, changeWeek } = useSchedule(department, id)
  const { updateGroup } = useAppContext()
  const time = useTime()

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
    if (department !== undefined && id !== undefined) {
      updateGroup(department, id)
    }
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

export default ScheduleMain
