import React, { memo } from 'react'
import { makeStyles, createStyles, LinearProgress } from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  loader: {
    position: 'absolute',
    top: 0,
    height: theme.spacing(1),
    left: 0,
    width: '100%'
  }
}))

export const DriverSuspenseLoader = memo(() => {
  const classes = useStyles()

  return (
    <LinearProgress className={classes.loader} />
  )
})
