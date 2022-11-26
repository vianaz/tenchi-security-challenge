import { motion } from 'framer-motion'

import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.scss'

type GridContainerProps = {
  id: string
  name: string
  lazyLoad: boolean
  type: 'locations' | 'episodes'
}
export const GridContainer = ({
  id,
  name,
  lazyLoad,
  type
}: GridContainerProps): JSX.Element => {
  const href = {
    episodes: `/episodes/${id}`,
    locations: `/locations/${id}`
  }
  return (
    <motion.div
      className={styles.container}
      whileTap={{
        scale: 0.9
      }}>
      <Link href={href[type]}>
        <Image
          src='/mask.svg'
          alt='planet'
          width={115}
          height={115}
          className={lazyLoad ? 'lazy' : ''}
        />
        <p>{name}</p>
      </Link>
    </motion.div>
  )
}
