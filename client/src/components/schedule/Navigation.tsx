import React, { useState } from 'react'
import { Week } from '@types'
import LeftArrow from 'mdi-react/ChevronLeftIcon'
import RightArrow from 'mdi-react/ChevronRightIcon'
import { dateFromDay } from '@util/time'
import { PREFIX } from '@enums'
import { useTranslation } from 'react-i18next'

interface Props {
  activeWeek: Week | null,
  fullWeeks: Week[] | null,
  changeWeek: (week: number) => void,
  fullYear: number
}

const Navigation = ({
  activeWeek,
  changeWeek,
  fullWeeks,
  fullYear
}: Props) => {
  const { t } = useTranslation('schedule')
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
                <p>{t('week')} {activeWeek.weekNum}</p>
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
                  <a>{t('week')} {week.weekNum} | <span>{start.getDate()}.{start.getMonth() + 1}―{end.getDate()}.{end.getMonth() + 1}</span></a>
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

export default Navigation
