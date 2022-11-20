import Image from 'next/image'

import { capitalize } from '@libs'

import styles from './styles.module.scss'

type CharPageLastLocationProps = {
  lastLocation: string
  lazyLoad: boolean
}

export const CharPageLastLocation = ({
  lastLocation,
  lazyLoad
}: CharPageLastLocationProps): JSX.Element => {
  return lazyLoad ? (
    <div className={`${styles.noLastLocation} lazy`}></div>
  ) : (
    <div className={styles.lastLocation}>
      <Image
        src='/lastLocation.svg'
        alt='Last Location Icon'
        width={35}
        height={35}
      />
      <p>{capitalize(lastLocation)}</p>
    </div>
  )
}
