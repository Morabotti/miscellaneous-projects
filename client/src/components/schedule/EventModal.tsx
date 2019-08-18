import React, { useState, useEffect } from 'react'
import { ScheduleEvent, Teacher, Room } from '../../types'
import { fetchTeacher, fetchRoom } from '../../client'
import { times, SIZE } from '../../enum'
import { useSettings } from '../../hooks'

import RemoveIcon from 'mdi-react/CloseCircleIcon'
import Users from 'mdi-react/AccountsIcon'
import User from 'mdi-react/AccountIcon'
import BookIcon from 'mdi-react/BookIcon'
import MapMarkerIcon from 'mdi-react/MapMarkerIcon'
import ClockIcon from 'mdi-react/ClockIcon'
// import CopyIcon from 'mdi-react/ContentCopyIcon'

interface Props {
  isOpen: boolean,
  onClose: () => void,
  event: ScheduleEvent,
  url: string
}

export default ({
  isOpen,
  onClose,
  event
}: Props) => {
  const [teacher, setTeacher] = useState<null | Teacher>(null)
  const [room, setRoom] = useState<null | Room>(null)
  const { settings } = useSettings()

  useEffect(() => {
    if (event && event.teacher) {
      fetchTeacher(event.teacher)
        .then(setTeacher)
    }
  }, [event.teacher])

  useEffect(() => {
    if (event.room !== null && settings !== null && settings.useMap) {
      fetchRoom(event.room)
        .then(setRoom)
    }
  }, [event.room, settings])

  return (
    <div
      className={`modal ${isOpen ? 'show-modal' : ''}`}
      onClick={onClose}
    >
      <div className='modal-wrap'>
        <div
          className='modal-content'
          onClick={e => e.stopPropagation()}
        >
          <div className='modal-header'>
            <div className='header-icon'>
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
              <ClockIcon /> <span>{times[event.time - 3].from} - {times[event.length - 1 + event.time - 3].to}</span>
            </h3>
            {event.groups.length !== 0 && (
              <div className='modal-section'>
                <p>
                  <Users /><span>{event.groups.toString().replace(/,/g, ', ')}</span>
                </p>
              </div>
            )}
            {event.teacher && (
              <div className='modal-section'>
                <p>
                  <User /><span>{event.teacher} {teacher && `(${teacher.name})`}</span>
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
                      <MapMarkerIcon /><span>Kerros {room.floor}: {event.room}</span>
                    </h2>
                  </div>
                  {/*
                    <a
                      className='map-zoom'
                      href={url}
                      target='_blank'
                    >
                      <CopyIcon />
                    </a>
                  */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
