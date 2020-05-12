import React, { memo } from 'react'

import {
  createStyles,
  makeStyles,
  SvgIconProps,
  Typography as T
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: theme.spacing(1)
  }
}))

interface Props {
  Icon: React.ElementType<SvgIconProps>,
  text: string
}

export const InformationMissing = memo(({
  Icon,
  text
}: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Icon fontSize='large' />
      <T variant='body1' className={classes.text}>{text}</T>
    </div>
  )
})
