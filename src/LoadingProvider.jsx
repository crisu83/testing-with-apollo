import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import React from 'react';

const LoadingProvider = ({ children }) => {
  const loadingLink = new ApolloLink(
    () => new Observable(() => {}),
  );

  const client = new ApolloClient({
    link: loadingLink,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default LoadingProvider;