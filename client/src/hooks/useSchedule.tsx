import { useState, useEffect } from 'react'
import { fetchSchedule } from '@client'
import { Week } from '@types'
import { getWeekNumber } from '@util/time'
import { useHistory } from 'react-router'
import { useAppContext } from '@hooks'

interface ScheduleContext {
  activeSchedule: Week | null,
  fullSchedule: Week[] | null,
  loading: boolean,
  changeWeek: (week: number) => void
}

export const useSchedule = (
  department: string | undefined,
  id: string | undefined
): ScheduleContext => {
  const { updateGroup } = useAppContext()
  const { replace } = useHistory()
  const [ activeSchedule, setActiveSchedule ] = useState<null | Week>(null)
  const [ loading, setLoading ] = useState(true)
  const [ fullSchedule, setFullSchedule ] = useState<null | Week[]>(null)

  useEffect(() => {
    if (department === undefined || id === undefined) {
      return
    }

    fetchSchedule(department, id)
      .then(schedule => {
        setFullSchedule(schedule)
        const date = getWeekNumber(new Date())
        const closestWeek = schedule.reduce((p, c) =>
          Math.abs(
            c.weekNum - date.week
          ) < Math.abs(
            p.weekNum - date.week
          ) && Math.abs(
            c.weekNum - date.week
          ) < 20 ? c : p
        )
        setActiveSchedule(closestWeek)
        setLoading(false)
      })
      .catch(() => {
        updateGroup(null, null)
        replace('/')
      })
  }, [])

  const changeWeek = (week: number) => {
    if (fullSchedule === null) {
      return
    }

    const newWeek = fullSchedule.find(i => i.weekNum === week)

    if (newWeek) {
      setActiveSchedule(newWeek)
    }
  }

  return {
    activeSchedule,
    fullSchedule,
    loading,
    changeWeek
  }
}
