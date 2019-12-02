import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloLink, Observable } from 'apollo-link'
import React from 'react'

const ErrorProvider = ({ errors, children }) => {
  const errorLink = new ApolloLink(
    () =>
      new Observable(observer => {
        observer.next({ errors })
        observer.complete()
      }),
  )

  const client = new ApolloClient({
    link: errorLink,
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ErrorProvider
