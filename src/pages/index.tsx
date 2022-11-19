import { gql, useQuery } from '@apollo/client'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { CharacterContainer, Header } from '@components'
import { capitalize } from '@libs'
import { useCallback } from 'react'
import { useMemo } from 'react'

const GET_CHARACTERS = gql`
  query GET_CHARACTERS($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        image
        origin {
          name
        }
        episode {
          name
        }
      }
    }
  }
`

type CharInfos = {
  characters: {
    results: {
      id: string
      name: string
      status: string
      species: string
      image: string
      origin: {
        name: string
      }
      episode: {
        name: string
      }[]
    }[]
  }
}

type Results = CharInfos['characters']['results']

const Home = (): JSX.Element => {
  const { data, loading, fetchMore } = useQuery<CharInfos>(GET_CHARACTERS, {
    variables: {
      page: 1
    }
  })

  const dataCharacters = useMemo<Results | []>(
    () => (data ? data.characters.results : Array.from({ length: 20 })),
    [data]
  )

  const getMoreData = useCallback((): void => {
    fetchMore({
      variables: {
        page: dataCharacters.length / 20 + 1
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev

        return Object.assign({}, prev, {
          characters: {
            results: [
              ...prev.characters.results,
              ...fetchMoreResult.characters.results
            ]
          }
        })
      }
    })
  }, [dataCharacters, fetchMore])

  const getLastOfList = useCallback((list: string[] | undefined) => {
    return list ? list[list.length - 1] : ''
  }, [])

  const router = useRouter()
  const { t } = useTranslation('common')

  const headerInfos = [
    {
      text: t('header.characters'),
      url: '/'
    },
    {
      text: t('header.locations'),
      url: '/locations'
    },
    {
      text: t('header.episodies'),
      url: '/episodes'
    }
  ]

  return (
    <div id='home'>
      <Header
        headerInfos={headerInfos}
        router={router.pathname}
      />
      <InfiniteScroll
        dataLength={dataCharacters.length}
        hasMore={true}
        next={getMoreData}
        loader={<></>}>
        <Characters
          dataCharacters={dataCharacters}
          loading={loading}
          getLastOfList={getLastOfList}
        />
      </InfiniteScroll>
    </div>
  )
}

type CharactersProps = {
  dataCharacters: Results
  loading: boolean
  getLastOfList: (list: string[] | undefined) => string
}
const Characters = ({
  dataCharacters,
  loading,
  getLastOfList
}: CharactersProps): JSX.Element => (
  <>
    {dataCharacters.map(char => {
      return (
        <CharacterContainer
          key={char?.id}
          id={char?.id}
          name={capitalize(char?.name)}
          image={char?.image}
          aliveStatus={capitalize(char?.status)}
          specie={capitalize(char?.species)}
          origin={capitalize(char?.origin.name)}
          episode={getLastOfList(char?.episode.map(ep => ep.name))}
          lazyLoad={loading}
        />
      )
    })}
  </>
)

export default Home
