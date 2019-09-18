import React, { useState, useEffect } from 'react'
import { ScheduleEvent, Teacher, Room, Week } from '../../types'
import { fetchTeacher, fetchRoom, sendReport } from '../../client'
import { times, SIZE } from '../../enum'
import { useAppContext } from '../../hooks'

import RemoveIcon from 'mdi-react/CloseCircleIcon'
import Users from 'mdi-react/AccountsIcon'
import User from 'mdi-react/AccountIcon'
import BookIcon from 'mdi-react/BookIcon'
import MapMarkerIcon from 'mdi-react/MapMarkerIcon'
import ClockIcon from 'mdi-react/ClockIcon'
import { MenuStruct } from '../common'

interface Props {
  isOpen: boolean,
  onClose: () => void,
  event: ScheduleEvent,
  week: Week
}

export default ({
  isOpen,
  onClose,
  event,
  week
}: Props) => {
  const [teacher, setTeacher] = useState<null | Teacher>(null)
  const [room, setRoom] = useState<null | Room>(null)
  const [menuRef, setMenuRef] = useState<null | HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { settings } = useAppContext()

  const _menuPress = (option: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    switch (option) {
      case 'orginal':
        window.open(week.weekUrl, '_blank')
        setMenuOpen(false)
        return
      case 'report':
        sendReport(week.group, week.weekNum)
          .then(() => {
            setMenuOpen(false)
          })
        return
      default:
        setMenuOpen(false)
    }
  }

  const _defaultPress = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (menuOpen) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    if (event && event.teacher) {
      fetchTeacher(event.teacher)
        .then(setTeacher)
    }
  }, [event.teacher])

  useEffect(() => {
    if (event.room !== null && settings !== null && settings.useMap) {
      fetchRoom(event.room.substring(0, 5))
        .then(setRoom)
    }
  }, [event.room, settings])

  const timeStart = times[event.time - 3].from
  const timeEnd = times[event.length - 1 + event.time - 3] === undefined
    ? times[times.length - 1].to
    : times[event.length - 1 + event.time - 3].to

  return (
    <div
      className={`modal ${isOpen ? 'show-modal' : ''}`}
      onClick={onClose}
    >
      <div className='modal-wrap'>
        <div
          className='modal-content'
          onClick={_defaultPress}
        >
          <div className='modal-header'>
            <div
              className='header-icon'
              ref={ref => setMenuRef(ref)}
              onClick={() => setMenuOpen(true)}
            >
              <BookIcon />
            </div>
            <div className='header-text'>
              <h3>{event.title}</h3>
            </div>
            <div
              className='header-icon exit-wrap'
              onClick={onClose}
            >
              <RemoveIcon />
            </div>
          </div>
          <div className='modal-container'>
            <h3>
              <ClockIcon />
              <span>{timeStart} - {timeEnd}</span>
            </h3>
            {event.groups.length !== 0 && (
              <div className='modal-section'>
                <p>
                  <Users />
                  <span>{event.groups.toString().replace(/,/g, ', ')}</span>
                </p>
              </div>
            )}
            {event.teacher && (
              <div className='modal-section'>
                <p>
                  <User />
                  <span>{event.teacher} {teacher && `(${teacher.name})`}</span>
                </p>
              </div>
            )}
            {event.room === null ? (
              <div />
            ) : room === null || (settings && !settings.useMap) ? (
              <div className='modal-section'>
                <p>
                  <MapMarkerIcon /><span>{event.room}</span>
                </p>
              </div>
            ) : (
              <div className='modal-map'>
                <div className='map-wrap'>
                  <svg
                    viewBox='0 0 630 354'
                    className='control-map'
                    style={{
                      backgroundImage: `url(/assets/floors/${room.floor}.svg)`
                    }}
                  >
                    <foreignObject
                      x={room.x - (SIZE / 2)}
                      y={room.y - (SIZE / 2)}
                      width={SIZE}
                      height={SIZE}
                    >
                      <div className='circle'>
                        <span>{room.name}</span>
                      </div>
                    </foreignObject>
                  </svg>
                  <div className='map-location'>
                    <h2>
                      <MapMarkerIcon />
                      <span>Kerros {room.floor}: {event.room}</span>
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <MenuStruct
        isOpen={menuOpen}
        element={menuRef}
      >
        <ul>
          <li onClick={_menuPress('orginal')}>Avaa alkuperäinen.</li>
          <li onClick={_menuPress('report')}>Raportoi virhe.</li>
        </ul>
      </MenuStruct>
    </div>
  )
}
