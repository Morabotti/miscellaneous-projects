import React, { FC, memo } from 'react'
import { Typography as T } from '@material-ui/core'

export const SuspenseLoader: FC = memo(() => {
  return (
    <T variant='body1'>Loading</T>
  )
})
