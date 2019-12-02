import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, Observable } from 'apollo-link'
import React from 'react'
import useApolloClient from './useApolloClient'

const LoadingProvider = ({ children }) => {
  const loadingLink = new ApolloLink(() => new Observable(() => {}))

  const client = useApolloClient({
    link: loadingLink,
    cache: new InMemoryCache(),
  })

  return children ? (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  ) : null
}

export default LoadingProvider
