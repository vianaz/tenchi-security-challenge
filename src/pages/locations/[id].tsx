import { GetStaticPaths, GetStaticProps } from 'next'

import { gql } from '@apollo/client'

import client from '@graphql'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'
import { DetailInfoContainer, TableContainer } from '@components'

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
  const { isFallback } = useRouter()

  return (
    <div className={styles.content}>
      <div>
        <DetailInfoContainer
          name={location?.name}
          text1={location?.type}
          text2={location?.dimension}
          image1='/origin.svg'
          image2='/lastLocation.svg'
          lazyLoad={isFallback}
        />
      </div>

      <TableContainer
        columns={[
          {
            header: 'Name',
            accessor: 'name'
          },
          {
            header: 'Status',
            accessor: 'status'
          },
          {
            header: 'Species',
            accessor: 'species'
          },
          {
            header: 'Type',
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
