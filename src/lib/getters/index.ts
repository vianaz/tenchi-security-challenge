import { gql } from '@apollo/client'

import client from '@graphql'
import { capitalize } from '../textFormatter'

const GET_ALL_CHARACTERS = gql`
  query getAllCharacters($page: Int!) {
    characters(page: $page) {
      info {
        next
      }
      results {
        status
        species
      }
    }
  }
`
export type CharactesGetterData = {
  results: {
    status: string
    species: string
  }[]
}

export const getAllSpecies = async (): Promise<{
  species: string[]
  characters: CharactesGetterData['results']
}> => {
  const characters = await getAllCharacters()
  const species: string[] = []

  for (const character of characters) {
    const { species: characterSpecies } = character

    if (!species.includes(capitalize(characterSpecies))) {
      species.push(capitalize(characterSpecies))
    }
  }

  return { species, characters }
}

export const getAllCharacters = async (): Promise<
  CharactesGetterData['results']
> => {
  const characters = []
  let page = 1

  while (page) {
    const { data } = await client.query({
      query: GET_ALL_CHARACTERS,
      variables: {
        page
      }
    })

    page = data.characters.info.next

    characters.push(...data.characters.results)
  }

  return characters
}

const GET_CHARACTERS_STATUS = gql`
  query GetCharactersStatus($page: Int) {
    locations(page: $page) {
      info {
        next
      }
      results {
        name
        residents {
          status
        }
      }
    }
  }
`

type LocationsData = {
  locations: {
    info: {
      next: number
    }
    results: {
      name: string
      residents: {
        status: string
      }[]
    }[]
  }
}

export type Locations = {
  name: string
  residents: {
    status: string
  }[]
}
export const getAllLocations = async () => {
  const locations: Locations[] = []
  let page = 1

  while (page) {
    const { data } = await client.query<LocationsData>({
      query: GET_CHARACTERS_STATUS,
      variables: {
        page
      }
    })

    page = data.locations.info.next

    locations.push(...data.locations.results)
  }

  return locations
}
