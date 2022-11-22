import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

type LocationContainerProps = {
  id: string
  name: string
  lazyLoad: boolean
}
export const LocationContainer = ({
  id,
  name,
  lazyLoad
}: LocationContainerProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <Link href={`/locations/${id}`}>
        <Image
          src='/mask.svg'
          alt='planet'
          width={115}
          height={115}
          className={lazyLoad ? 'lazy' : ''}
        />
        <p>{name}</p>
      </Link>
    </div>
  )
}
