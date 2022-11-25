import { useEffect, useState } from 'react'

import { CharactesGetterData, getAllSpecies } from '@libs'

export const useSpecies = () => {
  const [species, setSpecies] = useState<string[]>([])
  const [characters, setCharacters] = useState<CharactesGetterData['results']>(
    []
  )

  useEffect(() => {
    getAllSpecies().then(({ species, characters }) => {
      setSpecies(species)
      setCharacters(characters)
    })
  }, [])

  return { species, characters }
}
