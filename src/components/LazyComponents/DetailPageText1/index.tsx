import Image from 'next/image'

import { capitalize } from '@libs'

import styles from './styles.module.scss'

type DetailPageText1Props = {
  text: string
  image: string
  lazyLoad: boolean
}

export const DetailPageText1 = ({
  text,
  image,
  lazyLoad
}: DetailPageText1Props): JSX.Element => {
  return lazyLoad ? (
    <div className={`${styles.noOrigin} lazy`}></div>
  ) : (
    <div className={styles.origin}>
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
