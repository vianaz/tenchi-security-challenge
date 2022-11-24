import styles from './styles.module.scss'

type DetailPageTitleProps = {
  title: string
  lazyLoad: boolean
}

export const DetailPageTitle = ({
  title,
  lazyLoad
}: DetailPageTitleProps): JSX.Element => {
  return lazyLoad ? (
    <div className={`${styles.noTitle} lazy`}></div>
  ) : (
    <h1 className={styles.title}>{title}</h1>
  )
}
