import React from 'react'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'

import {
  createStyles,
  makeStyles,
  Tooltip,
  Fab,
  SvgIconTypeMap
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  action: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    margin: theme.spacing(3.5)
  }
}))

interface Props {
  title: string,
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>,
  onClick: () => void
}

export const ActionButton = ({
  title,
  onClick,
  icon: Icon
}: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.action}>
      <Tooltip title={title}>
        <Fab
          color='primary'
          onClick={onClick}
        >
          <Icon />
        </Fab>
      </Tooltip>
    </div>
  )
}
