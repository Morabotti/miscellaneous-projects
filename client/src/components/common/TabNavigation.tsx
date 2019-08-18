import React from 'react'
import ExitIcon from 'mdi-react/ExitToAppIcon'

interface Props {
  back: () => void,
  header: string,
  logo: JSX.Element,
  children: JSX.Element | JSX.Element[]
}

export default ({
  back,
  logo,
  header,
  children
}: Props) => (
  <div className='tab-container'>
    <div className='tab-header'>
      <div className='tab-logo'>
        {logo}
      </div>
      <div><h3>{header}</h3></div>
      <div className='tab-exit' onClick={back}>
        <ExitIcon />
      </div>
    </div>
    <div className='tab-wrap'>
      {children}
    </div>
  </div>
)
