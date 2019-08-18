import React from 'react'
import { firstLetterUpperCase } from '../../helpers/letters'

interface Props {
  header: string,
  options: string[],
  selected: string,
  onSelect: (set: string) => void
}

export default ({
  options,
  selected,
  onSelect,
  header
}: Props) => (
  <div className='settings-section'>
    <div className='settings-info'>
      <h2>{header}</h2>
    </div>
    <div className='settings-options'>
      <div className='btn-group settings-group' id='grid-type'>
        {options.map((o, i) => (
          <button
            key={i}
            type='button'
            onClick={() => onSelect(o)}
            className={`btn ${selected === o ? 'selected' : ''}`}
          >{firstLetterUpperCase(o)}</button>
        ))}
      </div>
    </div>
  </div>
)
