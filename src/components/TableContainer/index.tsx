import { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { usePagination } from '@hooks'

import styles from './styles.module.scss'

type TableContainerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]
  columns: {
    header: string
    accessor: string
  }[]
  type: 'episode' | 'character'
}

export const TableContainer = ({
  data,
  columns,
  type
}: TableContainerProps): JSX.Element => {
  const { t } = useTranslation('common')
  const [page, setPage] = useState(1)
  const dataPerPage = 10

  const [dataPaginated, setDataPaginated] = usePagination({
    data,
    dataPerPage
  })

  const changePage = (pageNumber: number) => {
    setPage(pageNumber)
    setDataPaginated(pageNumber)
  }
  const isLastPage = Math.floor(data?.length / dataPerPage + 1) === page

  const typesHashTable = {
    episode: {
      header: t('table.episodes'),

      [Symbol.toPrimitive](): string {
        return '/episodes'
      }
    },

    character: {
      header: t('table.location'),

      [Symbol.toPrimitive](): string {
        return '/character'
      }
    }
  }

  const router = useRouter()
  return (
    <div className={styles.tableContainer}>
      <h2>{typesHashTable[type].header}</h2>
      <table
        className={`table table-striped  table-hover ${styles.customTableDesign}`}>
        <thead>
          <tr>
            {columns?.map(({ header }, index) => (
              <th
                className={
                  columns.length - 1 === index && columns.length > 3
                    ? styles.lastColumn
                    : ''
                }
                key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {dataPaginated?.map((row, index) => (
            <tr key={index}>
              {columns.map(({ accessor }, index) => (
                <td
                  className={
                    columns.length - 1 === index && columns.length > 3
                      ? styles.lastColumn
                      : ''
                  }
                  onClick={(): Promise<boolean> =>
                    router.push(`${typesHashTable[type]}/${row.id}`)
                  }
                  key={index}>
                  {row[accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          onClick={(): void => changePage(page - 1)}
          disabled={page === 1}>
          <Image
            src='/arrow-left.svg'
            alt='arrow-left'
            width={30}
            height={30}
          />
        </button>
        <span>{page}</span>
        <button
          onClick={(): void => changePage(page + 1)}
          disabled={isLastPage}>
          <Image
            src='/arrow-right.svg'
            alt='arrow-right'
            width={30}
            height={30}
          />
        </button>
      </div>
    </div>
  )
}
