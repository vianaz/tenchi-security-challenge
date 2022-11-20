import {
  CharPageLastLocation,
  CharPageOrigin,
  CharPageTitle
} from '@components'

import styles from './styles.module.scss'

export type CharacterInfoContainerProps = {
  name: string
  origin: string
  location: string
  lazyLoad: boolean
}

export const CharacterInfoContainer = ({
  name,
  origin,
  location,
  lazyLoad
}: CharacterInfoContainerProps): JSX.Element => {
  return (
    <div className={styles.infos}>
      <CharPageTitle
        title={name}
        lazyLoad={lazyLoad}
      />

      <CharPageOrigin
        origin={origin}
        lazyLoad={lazyLoad}
      />

      <CharPageLastLocation
        lastLocation={location}
        lazyLoad={lazyLoad}
      />
    </div>
  )
}
