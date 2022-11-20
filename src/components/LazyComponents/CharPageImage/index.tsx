import Image from 'next/image'

import styles from './styles.module.scss'

type CharPageImage = {
  lazyLoad: boolean
  image: string
}

export const CharPageImage = ({
  image,
  lazyLoad
}: CharPageImage): JSX.Element => {
  return lazyLoad ? (
    <div className={`${styles.noImage} lazy`}></div>
  ) : (
    <div className={styles.image}>
      <Image
        fill
        src={image}
        alt='Character Image'
      />
    </div>
  )
}
