import React, { useCallback } from 'react'
import { HeadCell, Order } from '@types'

import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  createStyles,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(() => createStyles({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

interface Props<T> {
  headCells: HeadCell<T>[],
  numSelected: number,
  rowCount: number,
  order: Order,
  orderBy: string,
  showActions?: boolean,
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
}

export function VisualizedTableHead<T> ({
  numSelected,
  rowCount,
  headCells,
  order,
  orderBy,
  onSelectAll,
  onRequestSort,
  showActions = false
}: Props<T>) {
  const classes = useStyles()

  const createSortHandler = useCallback((
    property: keyof T
  ) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property)
  }, [onRequestSort])

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAll}
            inputProps={{ 'aria-label': 'select all items' }}
          />
        </TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell.float ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {showActions && (
          <TableCell padding='none' />
        )}
      </TableRow>
    </TableHead>
  )
}
