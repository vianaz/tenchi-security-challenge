import Image from 'next/image'

import { capitalize } from '@libs'

import styles from './styles.module.scss'

type CharPageOriginProps = {
  origin: string
  lazyLoad: boolean
}

export const CharPageOrigin = ({
  origin,
  lazyLoad
}: CharPageOriginProps): JSX.Element => {
  return lazyLoad ? (
    <div className={`${styles.noOrigin} lazy`}></div>
  ) : (
    <div className={styles.origin}>
      <Image
        src='/origin.svg'
        alt='Origin Icon'
        width={35}
        height={35}
      />
      <p>{capitalize(origin)}</p>
    </div>
  )
}
