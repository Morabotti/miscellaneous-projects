import React, { memo } from 'react'
import { useAuth } from '@hooks'
import { Typography as T } from '@material-ui/core'

interface Props {
  children: JSX.Element
}

export const AuthLayer = memo(({ children }: Props) => {
  const { loading, auth, error } = useAuth()

  if (error) {
    return (
      <T variant='body1'>Error</T>
    )
  }

  if (loading || auth === null) {
    return (
      <T variant='body1'>Loading</T>
    )
  }

  return children
})
