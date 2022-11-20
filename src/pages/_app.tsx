import { ApolloProvider } from '@apollo/client'

import type { AppProps } from 'next/app'

import client from '@graphql'

import { Header } from '@components'
import '@style'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
