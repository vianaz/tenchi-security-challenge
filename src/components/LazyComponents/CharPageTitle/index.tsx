import styles from './styles.module.scss'

type CharPageTitleProps = {
  title: string
  lazyLoad: boolean
}

export const CharPageTitle = ({
  title,
  lazyLoad
}: CharPageTitleProps): JSX.Element => {
  return lazyLoad ? (
    <div className={`${styles.noTitle} lazy`}></div>
  ) : (
    <h1 className={styles.title}>{title}</h1>
  )
}
