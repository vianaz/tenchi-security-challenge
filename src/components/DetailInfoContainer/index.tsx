import { DetailPageTitle, DetailPageText1, DetailPageText2 } from '@components'

import styles from './styles.module.scss'

export type DetailInfoContainerProps = {
  name: string
  text1: string
  image1: string
  text2: string
  image2: string
  lazyLoad: boolean
}

export const DetailInfoContainer = ({
  name,
  text1,
  image1,
  text2,
  image2,
  lazyLoad
}: DetailInfoContainerProps): JSX.Element => {
  return (
    <div className={styles.infos}>
      <DetailPageTitle
        title={name}
        lazyLoad={lazyLoad}
      />

      <DetailPageText1
        text={text1}
        image={image1}
        lazyLoad={lazyLoad}
      />

      <DetailPageText2
        text={text2}
        image={image2}
        lazyLoad={lazyLoad}
      />
    </div>
  )
}
