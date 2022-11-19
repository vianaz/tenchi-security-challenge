import { NextRouter } from 'next/router'
import Link from 'next/link'

import styles from './style.module.scss'

type Props = {
  headerInfos: HeaderData[]
  router: NextRouter['pathname']
}

type HeaderData = {
  text: string
  url: string
}

export const Header = ({ headerInfos, router }: Props): JSX.Element => {
  const isSelect = (url: string): boolean => {
    return router === url
  }

  return (
    <header className={styles.header}>
      {headerInfos.map(({ text, url }) => (
        <Link
          href={url}
          key={text}
          className={isSelect(url) ? styles.selected : ''}>
          {text}
        </Link>
      ))}
    </header>
  )
}
