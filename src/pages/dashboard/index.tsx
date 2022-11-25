/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo, useState } from 'react'

import Image from 'next/image'

import ReactSelect, { StylesConfig } from 'react-select'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { getRandomPlanet } from '@libs'

import styles from './styles.module.scss'
import { useLocations, useSpecies } from '@hooks'

ChartJS.register(...registerables)

const Dashboard = (): JSX.Element => {
  const [locationName, setLocationName] = useState('')
  const [speciesName, setSpeciesName] = useState('')
  const [filter, setFilter] = useState<string>('perLocation')

  const locations = useLocations()
  const { species, characters } = useSpecies()

  const calculateStatus = useMemo(() => {
    if (locations && filter === 'perLocation') {
      const filteredLocations = locations.find(
        location => location.name === locationName
      )

      const characters = filteredLocations?.residents
      const status = characters?.map(character => character.status)

      const alive = status?.filter(status => status === 'Alive').length
      const dead = status?.filter(status => status === 'Dead').length
      const unknown = status?.filter(status => status === 'unknown').length

      return [alive, unknown, dead]
    }

    if (species && filter === 'perSpecies') {
      const filteredCharactersPerSpecies = characters.filter(
        character => character.species === speciesName
      )

      const status = filteredCharactersPerSpecies?.map(
        character => character.status
      )

      const alive = status?.filter(status => status === 'Alive').length
      const dead = status?.filter(status => status === 'Dead').length
      const unknown = status?.filter(status => status === 'unknown').length

      return [alive, unknown, dead]
    }

    return [0, 0, 0]
  }, [locations, filter, species, locationName, characters, speciesName])

  const options = useMemo(() => {
    if (filter === 'perLocation') {
      return locations?.map(location => ({
        value: location.name,
        label: location.name
      }))
    }
    if (filter === 'perSpecies') {
      return species?.map(specie => ({
        value: specie,
        label: specie
      }))
    }

    return []
  }, [locations, filter, species])

  const Data = useMemo(
    () => (
      <Bar
        data={{
          labels: ['Alive', 'Unknown', 'Dead'],
          datasets: [
            {
              label: 'Status',
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
          options={options}
          styles={stylesReactSelect}
          components={{
            IndicatorSeparator: () => null
          }}
          // @ts-ignore
          formatOptionLabel={({ label }) => (
            <div className={styles.option}>
              <Image
                src={`/${getRandomPlanet()}`}
                alt='location'
                width={25}
                height={25}
              />
              <span>{label}</span>
            </div>
          )}
          // @ts-ignore
          onChange={({ value }) => {
            if (filter === 'perLocation') {
              setLocationName(value)
            }
            if (filter === 'perSpecies') {
              setSpeciesName(value)
            }
          }}
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
