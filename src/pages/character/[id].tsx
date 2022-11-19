import { gql } from '@apollo/client'

import useTranslation from 'next-translate/useTranslation'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import client from '@graphql'

import { EpisodiesTable, Header } from '@components'
import { capitalize } from '@libs'

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
  const router = useRouter()
  const { id } = router.query as { id: string }

  return (
    <div className={styles.content}>
      <Header />
      <div className={styles.containerInfo}>
        <div className={styles.image}>
          <Image
            fill
            src={character.image}
            alt='Character Image'
          />
        </div>
        <CharacterInfoContainer character={character} />
      </div>
      <EpisodesContainer character={character} />
    </div>
  )
}

const CharacterInfoContainer = ({
  character
}: CharacterPageProps): JSX.Element => {
  return (
    <div className={styles.infos}>
      <h2>{character.name}</h2>

      <div className={styles.origin}>
        <Image
          src='/origin.svg'
          alt='Origin Icon'
          width={35}
          height={35}
        />
        <p>{capitalize(character.origin.name)}</p>
      </div>

      <div className={styles.origin}>
        <Image
          src='/lastLocation.svg'
          alt='Last Location Icon'
          width={35}
          height={35}
        />
        <p>{capitalize(character.location.name)}</p>
      </div>
    </div>
  )
}

const EpisodesContainer = ({ character }: CharacterPageProps): JSX.Element => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.episodes}>
      <h2>{t('episodies')}</h2>
      <EpisodiesTable episodes={character.episode} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }
  const { data } = await client.query({
    query: GET_CHARACTER,
    variables: {
      id: id
    }
  })

  return {
    props: {
      character: data.character
    }
  }
}

export default CharacterPage
