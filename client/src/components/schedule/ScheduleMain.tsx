import React from 'react'
import { useSchedule } from '../../hooks'

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
    changeWeek,
    loading
  } = useSchedule(department, id)
  return (
    <div />
  )
}
