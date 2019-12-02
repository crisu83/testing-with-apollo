import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, Observable } from 'apollo-link'
import React from 'react'
import useApolloClient from './useApolloClient'

const ErrorProvider = ({ errors, children }) => {
  const errorLink = new ApolloLink(
    () =>
      new Observable(observer => {
        observer.next({ errors })
        observer.complete()
      }),
  )

  const client = useApolloClient({
    link: errorLink,
    cache: new InMemoryCache(),
  })

  return children ? (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  ) : null
}

export default ErrorProvider
