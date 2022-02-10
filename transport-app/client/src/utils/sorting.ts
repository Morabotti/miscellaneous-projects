import { Order } from '@types'

export function desc<T> (a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function stableSort<T> (array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSorting<K extends keyof any> (
  order: Order,
  orderBy: K
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): (a: { [key in K]: any }, b: { [key in K]: any }) => number {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

export function alphabetically<T> (key: keyof T) {
  return function (a: T, b: T) {
    if (a[key] === b[key]) {
      return 0
    }
    else if (a[key] === null) {
      return 1
    }
    else if (b[key] === null) {
      return -1
    }
    else {
      return a[key] < b[key] ? 1 : -1
    }
  }
}
