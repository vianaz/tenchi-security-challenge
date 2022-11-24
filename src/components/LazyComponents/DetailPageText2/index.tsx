import Image from 'next/image'

import { capitalize } from '@libs'

import styles from './styles.module.scss'

type DetailPageText2Props = {
  text: string
  image: string
  lazyLoad: boolean
}

export const DetailPageText2 = ({
  text,
  image,
  lazyLoad
}: DetailPageText2Props): JSX.Element => {
  return lazyLoad ? (
    <div className={`${styles.noLastLocation} lazy`}></div>
  ) : (
    <div className={styles.lastLocation}>
      <Image
        src={image}
        alt='Text Icon'
        width={35}
        height={35}
      />
      <p>{capitalize(text)}</p>
    </div>
  )
}
