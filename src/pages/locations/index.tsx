import InfiniteScroll from 'react-infinite-scroll-component'
import { gql, useQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'

import Image from 'next/image'

import { LocationContainer } from '@components'

import styles from './styles.module.scss'

const GET_LOCATIONS = gql`
  query GetLocations($page: Int!) {
    locations(page: $page) {
      results {
        id
        name
        type
      }
    }
  }
`

type LocationsInfos = {
  locations: {
    results: {
      id: string
      name: string
      type: string
    }[]
  }
}

type Results = LocationsInfos['locations']['results']

const LocationsPage = (): JSX.Element => {
  const { data, fetchMore, loading } = useQuery<LocationsInfos>(GET_LOCATIONS, {
    variables: {
      page: 1
    }
  })

  const dataLocations = useMemo<Results | []>(
    () => (data ? data.locations.results : Array.from({ length: 20 })),
    [data]
  )

  const getMoreData = useCallback((): void => {
    fetchMore({
      variables: {
        page: dataLocations.length / 20 + 1
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        return Object.assign({}, prev, {
          locations: {
            results: [
              ...prev.locations.results,
              ...fetchMoreResult.locations.results
            ]
          }
        })
      }
    })
  }, [dataLocations, fetchMore])

  return (
    <div>
      <InfiniteScroll
        dataLength={dataLocations.length}
        hasMore={true}
        next={getMoreData}
        loader={
          <div id='loading'>
            <Image
              src='/loading.gif'
              alt='Loading'
              width={140}
              height={140}
            />
          </div>
        }>
        <Locations
          dataLocations={dataLocations}
          loading={loading}
        />
      </InfiniteScroll>
    </div>
  )
}

type LocationsProps = {
  dataLocations: Results
  loading: boolean
}

const Locations = ({ dataLocations, loading }: LocationsProps): JSX.Element => {
  return (
    <div className={styles.grid}>
      {dataLocations.map(location => (
        <LocationContainer
          key={location?.name}
          id={location?.id}
          name={location?.name}
          lazyLoad={loading}
        />
      ))}
    </div>
  )
}

export default LocationsPage
