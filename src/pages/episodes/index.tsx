import { useCallback, useMemo } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import { gql, useQuery } from '@apollo/client'

import Image from 'next/image'

import { GridContainer, LogoComponent } from '@components'

import styles from './styles.module.scss'

const GET_EPISODES = gql`
  query GetLocations($page: Int!) {
    episodes(page: $page) {
      results {
        id
        name
      }
    }
  }
`

type EpisodesData = {
  episodes: {
    results: {
      id: string
      name: string
    }[]
  }
}

type Results = EpisodesData['episodes']['results']

const EpisodesPage = (): JSX.Element => {
  const { data, fetchMore, loading } = useQuery<EpisodesData>(GET_EPISODES, {
    variables: {
      page: 1
    }
  })

  const dataEpisodes = useMemo<Results | []>(
    () => (data ? data.episodes.results : Array.from({ length: 20 })),
    [data]
  )

  const getMoreData = useCallback((): void => {
    fetchMore({
      variables: {
        page: dataEpisodes.length / 20 + 1
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        return Object.assign({}, prev, {
          locations: {
            results: [
              ...prev.episodes.results,
              ...fetchMoreResult.episodes.results
            ]
          }
        })
      }
    })
  }, [dataEpisodes, fetchMore])

  return (
    <div className={styles.episodes}>
      <LogoComponent />
      <InfiniteScroll
        dataLength={dataEpisodes.length}
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
        <Episodes
          dataEpisodes={dataEpisodes}
          loading={loading}
        />
      </InfiniteScroll>
    </div>
  )
}

type EpisodesProps = {
  dataEpisodes: Results
  loading: boolean
}

const Episodes = ({ dataEpisodes, loading }: EpisodesProps): JSX.Element => {
  return (
    <div className={styles.grid}>
      {dataEpisodes.map(location => (
        <GridContainer
          key={location?.name}
          id={location?.id}
          name={location?.name}
          lazyLoad={loading}
          type='episodes'
        />
      ))}
    </div>
  )
}

export default EpisodesPage
