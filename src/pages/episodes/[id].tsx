import { useRouter } from 'next/router'

import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import { gql } from '@apollo/client'

import client from '@graphql'
import { DetailInfoContainer, TableContainer } from '@components'
import { getRandomPlanet } from '@libs'

import styles from './styles.module.scss'

const GET_EPISODE = gql`
  query GET_EPISODE($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        status
        species
        type
        gender
      }
    }
  }
`

type EpisodeInfo = {
  episode: {
    id: string
    name: string
    air_date: string
    episode: string
    characters: {
      id: string
      name: string
      status: string
      species: string
      type: string
      gender: string
    }[]
  }
}

type EpisodePage = EpisodeInfo
const EpisodePage = ({ episode }: EpisodePage): JSX.Element => {
  const { t } = useTranslation('common')
  const { isFallback } = useRouter()

  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <Image
          className={isFallback ? 'lazy' : ''}
          src={`/${isFallback ? 'mask.svg' : getRandomPlanet()}`}
          alt='planet'
          width={145}
          height={180}
        />
        <DetailInfoContainer
          name={episode?.name}
          text1={episode?.air_date}
          text2={episode?.episode}
          image1='/dimensionType.svg'
          image2='/dimension.svg'
          lazyLoad={isFallback}
        />
      </div>

      <TableContainer
        columns={[
          {
            header: t('locationPage.name'),
            accessor: 'name'
          },
          {
            header: t('locationPage.status'),
            accessor: 'status'
          },
          {
            header: t('locationPage.species'),
            accessor: 'species'
          },
          {
            header: t('locationPage.type'),
            accessor: 'type'
          }
        ]}
        data={episode?.characters}
        type='character'
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

  const { data } = await client.query<EpisodeInfo>({
    query: GET_EPISODE,
    variables: {
      id
    }
  })

  return {
    props: {
      episode: data.episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}

export default EpisodePage
