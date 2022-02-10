import React, { memo } from 'react'
import { makeStyles, createStyles, LinearProgress } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => createStyles({
  loader: {
    position: 'absolute',
    top: 0,
    height: theme.spacing(1),
    left: 0,
    width: '100%'
  },
  top: {
    top: 64
  }
}))

interface Props {
  navbarLoader?: boolean
}

export const SuspenseLoader = memo(({
  navbarLoader = false
}: Props) => {
  const classes = useStyles()

  return (
    <LinearProgress
      className={clsx(classes.loader, {
        [classes.top]: navbarLoader
      })}
    />
  )
})
