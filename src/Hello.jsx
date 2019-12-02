import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'

export const HELLO_QUERY = gql`
  query {
    hello
  }
`

export default function Hello() {
  const { loading, error, data } = useQuery(HELLO_QUERY)
  if (loading) return 'Loading...'
  if (error) return error.message
  return <h1>{data.hello}</h1>
}
