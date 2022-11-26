import { useRouter } from 'next/router'

import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import { gql } from '@apollo/client'

import client from '@graphql'
import { DetailInfoContainer, TableContainer } from '@components'
import { getRandomPlanet } from '@libs'

import styles from './styles.module.scss'

const GET_LOCATION = gql`
  query GET_LOCATION($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
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

type LocationInfos = {
  location: {
    id: string
    name: string
    type: string
    dimension: string
    residents: {
      id: string
      name: string
      status: string
      species: string
      type: string
      gender: string
    }[]
  }
}

type LocationPage = LocationInfos
const LocationPage = ({ location }: LocationPage): JSX.Element => {
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
          name={location?.name}
          text1={location?.type}
          text2={location?.dimension}
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
        data={location?.residents}
        type='location'
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

  const { data } = await client.query<LocationInfos>({
    query: GET_LOCATION,
    variables: {
      id
    }
  })

  return {
    props: {
      location: data.location
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}

export default LocationPage
