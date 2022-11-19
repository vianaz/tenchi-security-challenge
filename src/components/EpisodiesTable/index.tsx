import { Table } from 'antd'

import { columns } from './utils'

type EpisodiesTableProps = {
  episodes: {
    id: string
    name: string
    air_date: string
    episode: string
  }[]
}

export const EpisodiesTable = ({
  episodes
}: EpisodiesTableProps): JSX.Element => {
  return (
    <Table
      columns={columns}
      dataSource={episodes}
    />
  )
}
