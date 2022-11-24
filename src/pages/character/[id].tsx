import { gql } from '@apollo/client'

import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import client from '@graphql'

import { CharPageImage, DetailInfoContainer, TableContainer } from '@components'

import styles from './style.module.scss'

type CharacterPageProps = {
  character: {
    id: string
    name: string
    image: string
    origin: {
      id: string
      name: string
      type: string
      dimension: string
    }
    location: {
      id: string
      name: string
      type: string
      dimension: string
    }
    episode: {
      id: string
      name: string
      air_date: string
      episode: string
    }[]
  }
  lazyLoad: boolean
}

const GET_CHARACTER = gql`
  query GET_CHARACTER($id: ID!) {
    character(id: $id) {
      id
      name
      image

      origin {
        id
        name
        type
        dimension
      }

      location {
        id
        name
        type
        dimension
      }

      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`

const CharacterPage = ({ character }: CharacterPageProps): JSX.Element => {
  const { isFallback } = useRouter()

  return (
    <div className={styles.content}>
      <div className={styles.containerInfo}>
        <CharPageImage
          image={character?.image}
          lazyLoad={isFallback}
        />
        <DetailInfoContainer
          name={character?.name}
          text1={character?.origin.name}
          text2={character?.location.name}
          image1='/origin.svg'
          image2='/lastLocation.svg'
          lazyLoad={isFallback}
        />
      </div>
      <TableContainer
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Air Date', accessor: 'air_date' },
          { header: 'Episode', accessor: 'episode' }
        ]}
        data={character?.episode}
        type='episode'
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { id } = ctx.params as { id: string }

  const { data } = await client.query({
    query: GET_CHARACTER,
    variables: {
      id
    }
  })

  return {
    props: {
      character: data.character
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}

export default CharacterPage
