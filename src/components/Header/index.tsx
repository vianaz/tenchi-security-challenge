import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'

import { Dropdown } from 'react-bootstrap'

import styles from './style.module.scss'

export const Header = (): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const headerInfos = [
    {
      text: 'Dashboard',
      url: '/dashboard'
    },
    {
      text: t('header.characters'),
      url: '/'
    },
    {
      text: t('header.locations'),
      url: '/locations'
    },
    {
      text: t('header.episodes'),
      url: '/episodes'
    }
  ]

  const isSelect = (url: string): boolean => {
    return router.pathname === url
  }

  return (
    <header className={styles.header}>
      <div className={styles.search}>
        <Image
          src='/search.svg'
          alt='search'
          width={20}
          height={20}
        />
        <input
          type='text'
          placeholder={t('header.search')}
        />
      </div>
      <div className={styles.inline}>
        {headerInfos.map(({ text, url }) => (
          <Link
            href={url}
            key={text}
            className={isSelect(url) ? styles.selected : ''}>
            {text}
          </Link>
        ))}
      </div>

      <Dropdown className={styles.dropdown}>
        <Dropdown.Toggle
          variant='success'
          id='dropdown-basic'>
          Menu
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {headerInfos.map(({ text, url }) => (
            <Dropdown.Item
              key={text}
              className={isSelect(url) ? styles.selected : ''}
              onClick={() => router.push(url)}>
              {text}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </header>
  )
}
