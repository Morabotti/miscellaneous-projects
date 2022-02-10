import React from 'react'
import { Background, LanguageBar, EndOfLife } from '.'

const EntryMain = () => (
  <div className='background-main'>
    <LanguageBar />
    <EndOfLife />
    <Background />
  </div>
)

/*
const EntryMain = () => (
  <div className='background-main'>
    <LanguageBar />
    <Menu />
    <Background />
  </div>
)
*/

export default EntryMain
