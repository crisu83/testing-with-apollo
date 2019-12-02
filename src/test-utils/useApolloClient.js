import { useEffect } from 'react'
import ApolloClient from 'apollo-client'

export default function useApolloClient(config) {
  const client = new ApolloClient(config)

  useEffect(() => {
    return () => {
      client.stop()
    }
  }, [client])

  return client
}
