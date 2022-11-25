/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo, useState } from 'react'

import { gql, useQuery } from '@apollo/client'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2'

import styles from './styles.module.scss'
import Image from 'next/image'
import ReactSelect, { StylesConfig } from 'react-select'

ChartJS.register(...registerables)

const GET_CHARACTERS_STATUS = gql`
  query GetCharactersStatus($page: Int) {
    locations(page: $page) {
      results {
        name
        residents {
          status
        }
      }
    }
  }
`

type LocationsData = {
  locations: {
    results: {
      name: string
      residents: {
        status: string
      }[]
    }[]
  }
}

const Dashboard = (): JSX.Element => {
  const { data } = useQuery<LocationsData>(GET_CHARACTERS_STATUS, {
    variables: {
      page: 1
    }
  })
  const [locationName, setLocationName] = useState('')
  const [filter, setFilter] = useState<string>('perLocation')

  const calculateStatus = useMemo(() => {
    if (data && filter === 'perLocation') {
      const locations = data.locations.results
      const location = locations.find(
        location => location.name === locationName
      )
      const characters = location?.residents
      const status = characters?.map(character => character.status)
      const alive = status?.filter(status => status === 'Alive').length
      const dead = status?.filter(status => status === 'Dead').length
      const unknown = status?.filter(status => status === 'unknown').length

      return [alive, unknown, dead]
    }

    return [0, 0, 0]
  }, [data, locationName, filter])

  const Data = useMemo(
    () => (
      <Bar
        data={{
          labels: ['Alive', 'Unknown', 'Dead'],
          datasets: [
            {
              label: 'Characters',
              data: calculateStatus,
              backgroundColor: [
                'rgba(6, 255, 31, 0.49)',
                'rgba(255, 230, 6, 0.48)',
                'rgba(255, 6, 6, 0.48)'
              ]
            }
          ]
        }}
        options={{
          maintainAspectRatio: false
        }}
      />
    ),
    [calculateStatus]
  )

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.buttons}>
          <input
            type='radio'
            name='options'
            id='option1'
            autoComplete='off'
            onChange={() => setFilter('perLocation')}
            checked={filter === 'perLocation'}
          />
          <label htmlFor='option1'>Location</label>
          <input
            type='radio'
            name='options'
            id='option2'
            autoComplete='off'
            onChange={() => setFilter('perSpecies')}
          />
          <label htmlFor='option2'>Species</label>
        </div>

        <ReactSelect
          options={
            data?.locations.results.map(location => ({
              value: location.name,
              label: location.name
            })) || []
          }
          styles={stylesReactSelect}
          components={{
            IndicatorSeparator: () => null
          }}
          // @ts-ignore
          formatOptionLabel={({ label }) => (
            <div className={styles.option}>
              <Image
                src='/planet_1.svg'
                alt='location'
                width={25}
                height={25}
              />
              <span>{label}</span>
            </div>
          )}
          // @ts-ignore
          onChange={({ value }) => setLocationName(value || '')}
        />
      </div>

      <div className={styles.dataContainer}>{Data}</div>
    </div>
  )
}

const stylesReactSelect: StylesConfig = {
  control: styles => ({
    ...styles,
    border: 'none',
    boxShadow: 'none',
    width: '300px',
    height: '40px',
    borderRadius: '10px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '18px',
    backgroundColor: '#1a1a1a'
  }),
  option: styles => ({
    ...styles,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '18px',
    backgroundColor: '#1a1a1a'
  }),
  input: styles => ({
    ...styles,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '18px'
  })
}

export default Dashboard
