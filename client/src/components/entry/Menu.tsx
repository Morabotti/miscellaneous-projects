import React from 'react'
import { useMainMenu, useRouter } from '../../hooks'
import { firstLetterUpperCase } from '../../helpers/letters'

export default () => {
  const {
    departments,
    classes,
    selectedClass,
    selectedDepartment,
    selectedSchool,
    changeClass,
    changeDepartment
  } = useMainMenu()
  const { history } = useRouter()

  const openSchedule = () => {
    history.push(`/schedule/${selectedDepartment}/${selectedClass}/`)
  }

  return (
    <div className='main-container'>
      <div className='wrap'>
        <h1 className='main-title'>
          <span>{selectedSchool.toUpperCase()}</span> Lukujärjestys
        </h1>
        <h1>Valitse yksikkö</h1>
        <select
          className='select-normal'
          value={selectedDepartment}
          onChange={changeDepartment}
        >
          {departments && departments.map((e, i) => (
            <option
              value={e}
              key={i}
              disabled={e !== 'tekniikka'}
            >{firstLetterUpperCase(e)}</option>
          ))}
        </select>
        <h1 className='margin-default'>Valitse luokka</h1>
        <select
          className='select-normal'
          value={selectedClass}
          onChange={changeClass}
        >
          {classes && classes.map(e => (
            <option
              value={e.fileShort}
              key={e.id}
            >{e.tableName}</option>
          ))}
        </select>
        <p className='margin-default notification'>Käyttämällä sivua hyväksyt evästeiden käytön.</p>
        <div className='submit-box'>
          <button
            className='submit-button'
            onClick={openSchedule}
          >Avaa lukujärjestys</button>
        </div>
      </div>
    </div>
  )
}
