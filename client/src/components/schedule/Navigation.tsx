import React, { useState } from 'react'
import { Week } from '../../types'
import LeftArrow from 'mdi-react/ChevronLeftIcon'
import RightArrow from 'mdi-react/ChevronRightIcon'
import { dateFromDay } from '../../helpers/time'
import { PREFIX } from '../../enum'

interface Props {
  activeWeek: Week | null,
  fullWeeks: Week[] | null,
  changeWeek: (week: number) => void,
  fullYear: number
}

export default ({
  activeWeek,
  changeWeek,
  fullWeeks,
  fullYear
}: Props) => {
  const [ weeksOpen, setWeeksOpen ] = useState(false)

  return (
    <>
      <div className='top-bar'>
        {activeWeek && (
          <>
            <div
              className='navigation-icon'
              onClick={() => changeWeek(activeWeek.weekNum - 1)}
            >
              <LeftArrow />
            </div>
            <div className='mid'>
              <button
                className='current-week'
                onClick={() => setWeeksOpen(!weeksOpen)}
              >
                <p>Viikko {activeWeek.weekNum}</p>
              </button>
            </div>
            <div
              className='navigation-icon'
              onClick={() => changeWeek(activeWeek.weekNum + 1)}
            >
              <RightArrow />
            </div>
          </>
        )}
      </div>
      <div className={`weeks-select-menu`}>
        <div className={`weeks-option ${!weeksOpen ? 'closed' : ''}`}>
          <div className='weeks-wrap'>
            {fullWeeks && activeWeek && fullWeeks.map(week => {
              const start = dateFromDay(fullYear, week.weekNum * 7 - PREFIX)
              const end = dateFromDay(fullYear, week.weekNum * 7 - PREFIX + 6)
              return (
                <div
                  key={week.weekNum}
                  className={`selection ${week.weekNum === activeWeek.weekNum ? 'selected' : ''}`}
                  onClick={() => {
                    changeWeek(week.weekNum)
                    setWeeksOpen(false)
                  }}
                >
                  <a>Viikko {week.weekNum} | <span>{start.getDate()}.{start.getMonth() + 1}―{end.getDate()}.{end.getMonth() + 1}</span></a>
                </div>
              )
            })

            }
          </div>
        </div>
        <div
          className='weeks-background'
          style={{ display: !weeksOpen ? 'none' : 'block' }}
          onClick={() => setWeeksOpen(false)}
        />
      </div>
    </>
  )
}
