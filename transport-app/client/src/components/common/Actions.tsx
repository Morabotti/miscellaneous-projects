import React, { memo } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  actions: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    display: 'flex',
    margin: theme.spacing(3.5)
  }
}))

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const Actions = memo(({ children }: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.actions}>
      {children}
    </div>
  )
})
