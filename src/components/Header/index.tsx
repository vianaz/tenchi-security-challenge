import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import styles from './style.module.scss'

export const Header = (): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const headerInfos = [
    {
      text: t('header.characters'),
      url: '/'
    },
    {
      text: t('header.locations'),
      url: '/locations'
    },
    {
      text: t('header.episodies'),
      url: '/episodes'
    }
  ]

  const isSelect = (url: string): boolean => {
    return router.pathname === url
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
