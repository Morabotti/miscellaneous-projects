import React, { useEffect } from 'react'
import { useMainMenu, useAppContext } from '@hooks'
import { firstLetterUpperCase } from '@util/letters'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'

const Menu = () => {
  const { replace } = useHistory()
  const { t, i18n } = useTranslation('home')
  const { department, group, updateGroup } = useAppContext()

  useEffect(() => {
    if (department && group) {
      replace(`/schedule/${department}/${group}/`)
    }
  }, [])

  const {
    departments,
    classes,
    selectedClass,
    selectedDepartment,
    selectedSchool,
    changeClass,
    changeDepartment
  } = useMainMenu()

  const openSchedule = () => {
    updateGroup(selectedDepartment, selectedClass)
    replace(`/schedule/${selectedDepartment}/${selectedClass}/`)
  }

  return (
    <div className='main-container'>
      <div className='wrap'>
        <h1 className='main-title'>
          <span>{selectedSchool.toUpperCase()} </span>
          {t('title')}
        </h1>
        <h1>{t('department')}</h1>
        <select
          className='select-normal'
          value={selectedDepartment}
          onChange={changeDepartment}
        >
          {departments && departments.map((e, i) => (
            <option
              value={e.en}
              key={i}
            >{firstLetterUpperCase(i18n.language === 'fi' ? e.fi : e.en)}</option>
          ))}
        </select>
        <h1 className='margin-default'>{t('group')}</h1>
        <select
          className='select-normal'
          value={selectedClass}
          onChange={changeClass}
        >
          {classes && classes.map(e => (
            <option
              value={e.groupId}
              key={e.groupId}
            >{e.groupId}: {e.groupName}</option>
          ))}
        </select>
        <div className='submit-box'>
          <button
            className='submit-button'
            onClick={openSchedule}
          >{t('open')}</button>
        </div>
      </div>
    </div>
  )
}

export default Menu
