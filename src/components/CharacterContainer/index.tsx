import Image from 'next/image'

import { motion } from 'framer-motion'

import styles from './style.module.scss'
import Link from 'next/link'

type CharacterContainerProps = {
  id: string
  name: string
  image: string
  aliveStatus: 'Alive' | 'Dead' | 'Unknown' | string
  specie: string
  origin: string
  episode: string
  lazyLoad: boolean
}

export const CharacterContainer = ({
  id,
  name,
  aliveStatus,
  specie,
  origin,
  episode,
  image,
  lazyLoad
}: CharacterContainerProps): JSX.Element => {
  return (
    <Link href={`/character/${id}`}>
      <motion.div
        className={styles.container}
        whileTap={{
          scale: 0.9
        }}>
        <CharImage
          image={image}
          lazyLoad={lazyLoad}
        />
        <div className={styles.info}>
          <CharTitle
            name={name}
            lazyLoad={lazyLoad}
          />

          <CharStatus
            aliveStatus={aliveStatus}
            specie={specie}
            lazyLoad={lazyLoad}
          />
          <CharOrigin
            origin={origin}
            lazyLoad={lazyLoad}
          />

          <CharEpisode
            episode={episode}
            lazyLoad={lazyLoad}
          />
        </div>
      </motion.div>
    </Link>
  )
}

const CharImage = ({
  image,
  lazyLoad
}: Pick<CharacterContainerProps, 'lazyLoad' | 'image'>): JSX.Element => {
  return lazyLoad ? (
    <div className={`${styles.noImage} ${styles.lazy}`} />
  ) : (
    <Image
      src={image || ''}
      alt='char img'
      width={135}
      height={185}
    />
  )
}

const CharTitle = ({
  lazyLoad,
  name
}: Pick<CharacterContainerProps, 'lazyLoad' | 'name'>): JSX.Element => {
  return lazyLoad ? (
    <div className={`${styles.noTitle} ${styles.lazy}`} />
  ) : (
    <h2 className={styles.name}>{name}</h2>
  )
}

const CharStatus = ({
  lazyLoad,
  aliveStatus,
  specie
}: Pick<
  CharacterContainerProps,
  'lazyLoad' | 'specie' | 'aliveStatus'
>): JSX.Element => {
  return lazyLoad ? (
    <div className={`${styles.noStatus} ${styles.lazy}`} />
  ) : (
    <div className={styles.aliveStatus}>
      <div className={styles[aliveStatus] || styles['default']}></div>
      <p>{`${aliveStatus} - ${specie}`}</p>
    </div>
  )
}

const CharOrigin = ({
  lazyLoad,
  origin
}: Pick<CharacterContainerProps, 'lazyLoad' | 'origin'>): JSX.Element => {
  return lazyLoad ? (
    <div className={`${styles.noOrigin} ${styles.lazy}`} />
  ) : (
    <div className={styles.origin}>
      <Image
        src='/origin.svg'
        alt='planet'
        width={25}
        height={25}
      />
      <p>{origin}</p>
    </div>
  )
}

const CharEpisode = ({
  lazyLoad,
  episode
}: Pick<CharacterContainerProps, 'lazyLoad' | 'episode'>): JSX.Element => {
  return lazyLoad ? (
    <div className={`${styles.noEpisode} ${styles.lazy}`} />
  ) : (
    <div className={styles.episode}>
      <Image
        src='/episode.svg'
        alt='episode'
        width={25}
        height={25}
      />
      <p>{episode}</p>
    </div>
  )
}
