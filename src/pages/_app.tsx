import { ApolloProvider } from '@apollo/client'

import type { AppProps } from 'next/app'

import client from '@graphql'

import '@style'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
