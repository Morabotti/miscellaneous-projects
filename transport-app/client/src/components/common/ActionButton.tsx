import React, { memo } from 'react'
import clsx from 'clsx'

import {
  createStyles,
  makeStyles,
  Tooltip,
  Fab
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  action: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    margin: theme.spacing(3.5)
  },
  margin: {
    marginRight: theme.spacing(2)
  }
}))

interface Props {
  title?: string,
  onClick: () => void,
  icon: JSX.Element,
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined,
  single?: boolean,
  marginRight?: boolean,
  disabled?: boolean
}

export const ActionButton = memo(({
  title,
  onClick,
  icon,
  color,
  single = false,
  marginRight = false,
  disabled = false
}: Props) => {
  const classes = useStyles()

  return (
    <div
      className={clsx({
        [classes.action]: single,
        [classes.margin]: marginRight
      })}
    >
      {disabled || !title ? (
        <Fab
          disabled={disabled}
          color={color}
          onClick={onClick}
        >
          {icon}
        </Fab>
      ) : (
        <Tooltip title={title}>
          <Fab
            color={color}
            onClick={onClick}
          >
            {icon}
          </Fab>
        </Tooltip>
      )}
    </div>
  )
})
