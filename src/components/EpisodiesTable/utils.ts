import type { ColumnsType } from 'antd/es/table'

export const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Air Date',
    dataIndex: 'air_date',
    key: 'air_date'
  },
  {
    title: 'Episode',
    dataIndex: 'episode',
    key: 'episode'
  }
]
