import { useEffect } from 'react'
import ApolloClient from 'apollo-client'

export default function useApolloClient(config) {
  const client = new ApolloClient(config)

  useEffect(() => {
    return () => {
      // Apollo Client should be terminated
      // when the component is unmounted.
      client.stop()
    }
  }, [client])

  return client
}
