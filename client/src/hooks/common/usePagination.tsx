import { useState, useCallback } from 'react'
import { PaginationContext } from '@types'

export function usePagination<T> (
  initLimit: number
): PaginationContext<T> {
  const [offset, setStateOffset] = useState(1)
  const [limit, setStateLimit] = useState(initLimit)

  const setOffset = (set: number) => setStateOffset(set)
  const setLimit = (set: number) => setStateLimit(set)

  const filterPagination = useCallback((item: T, index: number) => (
    index < offset * limit
  ) && (
    index >= offset * limit - limit
  ), [offset, limit])

  return {
    offset,
    limit,
    setOffset,
    setLimit,
    filterPagination
  }
}
