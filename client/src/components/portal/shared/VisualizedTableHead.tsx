import React, { useCallback } from 'react'
import { HeadCell, Order } from '@types'
import clsx from 'clsx'
import { MagnifyPlusOutline, MagnifyMinusOutline } from 'mdi-material-ui'

import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  createStyles,
  makeStyles,
  Tooltip,
  IconButton,
  TextField
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
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
  },
  search: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2)
  },
  visibility: {
    visibility: 'collapse'
  },
  visible: {
    visibility: 'unset'
  }
}))

interface Props<T> {
  headCells: HeadCell<T>[],
  numSelected: number,
  rowCount: number,
  order: Order,
  orderBy: string,
  showActions?: boolean,
  enableSearch?: boolean,
  searchMode?: boolean,
  filters?: Record<keyof T, string>,
  onToggleSearch?: () => void,
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void,
  onFilterChange: (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function VisualizedTableHead<T> ({
  numSelected,
  rowCount,
  headCells,
  searchMode,
  filters,
  order,
  orderBy,
  onSelectAll,
  onRequestSort,
  onToggleSearch,
  onFilterChange,
  showActions = false,
  enableSearch = false
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
        {enableSearch && (
          <TableCell padding='none' align='right'>
            <Tooltip title={searchMode ? 'Disable filters' : 'Set filters'}>
              <IconButton onClick={onToggleSearch}>
                {searchMode
                  ? <MagnifyMinusOutline />
                  : <MagnifyPlusOutline />
                }
              </IconButton>
            </Tooltip>
          </TableCell>
        )}
      </TableRow>
      <TableRow
        className={clsx(classes.visibility, {
          [classes.visible]: (searchMode && filters)
        })}
      >
        <TableCell />
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            padding={headCell.disablePadding ? 'none' : 'default'}
            classes={{ root: classes.search }}
          >
            <TextField
              value={filters?.[headCell.id] || ''}
              onChange={onFilterChange(headCell.id)}
              placeholder={headCell.label}
              variant='outlined'
              size='small'
              fullWidth
            />
          </TableCell>
        ))}
        {(showActions || enableSearch) && (
          <TableCell />
        )}
      </TableRow>
    </TableHead>
  )
}
