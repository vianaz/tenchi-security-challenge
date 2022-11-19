import Image from 'next/image'

import { motion } from 'framer-motion'

import styles from './style.module.scss'

type Props = {
  name: string
  image: string
  aliveStatus: 'Alive' | 'Dead' | 'Unknown' | string
  specie: string
  origin: string
  episode: string
}

export const CharacterContainer = ({
  name,
  aliveStatus,
  specie,
  origin,
  episode,
  image
}: Props): JSX.Element => {
  return (
    <motion.div
      className={styles.container}
      whileTap={{
        scale: 0.9
      }}>
      <Image
        src={image}
        alt='char img'
        width={135}
        height={185}
      />
      <div className={styles.info}>
        <h2 className={styles.name}>{name}</h2>

        <div className={styles.aliveStatus}>
          <div className={styles[aliveStatus] || styles['default']}></div>
          <p>{`${aliveStatus} - ${specie}`}</p>
        </div>

        <div className={styles.origin}>
          <Image
            src='/origin.svg'
            alt='planet'
            width={25}
            height={25}
          />
          <p>{origin}</p>
        </div>

        <div className={styles.episode}>
          <Image
            src='/episode.svg'
            alt='episode'
            width={25}
            height={25}
          />
          <p>{episode}</p>
        </div>
      </div>
    </motion.div>
  )
}
