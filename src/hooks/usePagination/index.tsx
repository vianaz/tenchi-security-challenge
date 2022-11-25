import { useState } from 'react'

type PaginationProps<T> = {
  data: T[]
  dataPerPage: number
}

export const usePagination = <T,>({
  data,
  dataPerPage
}: PaginationProps<T>): [T[], (pageNumber: number) => void] => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const indexOfLastData = currentPage * dataPerPage
  const indexOfFirstData = indexOfLastData - dataPerPage
  const currentData = data?.slice(indexOfFirstData, indexOfLastData)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return [currentData, paginate]
}
