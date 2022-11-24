import { useRouter } from 'next/router'
import styles from './styles.module.scss'

type TableContainerProps = {
  data: any[]
  columns: {
    header: string
    accessor: string
  }[]
  type: 'episode' | 'location'
}

const typesHashTable = {
  episode: {
    header: 'Episodes',

    [Symbol.toPrimitive](): string {
      return '/episodes'
    }
  },

  location: {
    header: 'Residents',

    [Symbol.toPrimitive](): string {
      return '/character'
    }
  }
}

export const TableContainer = ({
  data,
  columns,
  type
}: TableContainerProps): JSX.Element => {
  const router = useRouter()
  return (
    <div className={styles.tableContainer}>
      <h2>{typesHashTable[type].header}</h2>
      <table className={`table table-striped  ${styles.customTableDesign}`}>
        <thead>
          <tr>
            {columns?.map(({ header }, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
              {columns.map(({ accessor }, index) => (
                <td
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
    </div>
  )
}
