import { GetStaticPaths, GetStaticProps } from 'next'

import { gql } from '@apollo/client'

import client from '@graphql'
import { useRouter } from 'next/router'

const GET_LOCATION = gql`
  query GET_LOCATION($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
    }
  }
`

type LocationInfos = {
  location: {
    results: {
      id: string
      name: string
      type: string
      dimension: string
    }
  }
}

type LocationPage = LocationInfos
const LocationPage = ({ location }: LocationPage): JSX.Element => {
  const { isFallback } = useRouter()

  return (
    <div>
      <h1>Location Page</h1>
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
