import { useEffect, useState } from 'react'

import { getAllLocations, Locations } from '@libs'

export const useLocations = () => {
  const [locations, setLocations] = useState<Locations[]>([])

  useEffect(() => {
    getAllLocations().then(location => setLocations(location))
  }, [])

  return locations
}
