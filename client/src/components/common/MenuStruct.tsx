import React, { useState, useEffect } from 'react'

interface Props {
  element: HTMLElement | null,
  isOpen: boolean,
  children: JSX.Element | JSX.Element[]
}

interface Coords {
  x: number,
  y: number
}

export default ({
  element,
  children,
  isOpen
}: Props) => {
  const [coords, setCoords] = useState<Coords>({
    x: 0,
    y: 0
  })

  useEffect(() => {
    if (element) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const position: any = element.getBoundingClientRect()
      setCoords({
        x: position.x,
        y: position.y + 50
      })
    }
    return () => {
      setCoords({
        x: 0,
        y: 0
      })
    }
  }, [element, isOpen])

  if (!element || !isOpen) {
    return <div />
  }

  return (
    <div
      className='menu-container'
      style={{
        top: `${coords.y}px`,
        left: `${coords.x}px`
      }}
    >
      {children}
    </div>
  )
}
