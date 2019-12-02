import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import SchemaLink from 'apollo-link-schema'
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools'
import React from 'react'

const SchemaProvider = ({
  children,
  typeDefs,
  queryResolvers = {},
  mutationResolvers = {},
  subscriptionResolvers = {},
}) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolverValidationOptions: {
      // See: https://github.com/apollographql/apollo-server/issues/1075
      requireResolversForResolveType: false,
    },
  })

  const mocks = {
    Query: () => queryResolvers,
    Mutation: () => mutationResolvers,
    Subscription: () => subscriptionResolvers,
  }

  addMockFunctionsToSchema({ schema, mocks })

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default SchemaProvider
