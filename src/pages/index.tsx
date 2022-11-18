import useTranslation from 'next-translate/useTranslation'
import { gql, useQuery } from '@apollo/client'

const GET = gql`
  query {
    characters {
      results {
        id
        name
      }
    }
  }
`

const Home = (): JSX.Element => {
  const { data } = useQuery(GET)

  const { t } = useTranslation('common')
  return <h1>{t('test')}</h1>
}

export default Home
