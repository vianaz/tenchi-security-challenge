import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { CharacterContainer, Header } from '@components'

const Home = (): JSX.Element => {
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

  const infos = {
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    aliveStatus: 'Alive',
    specie: 'Human',
    origin: 'Earth (C-137)',
    episode: 'Pilot'
  }

  return (
    <div id='home'>
      <Header
        headerInfos={headerInfos}
        router={router.pathname}
      />
      <CharacterContainer {...infos} />
    </div>
  )
}

export default Home
