import { MockedProvider } from '@apollo/react-testing'
import { render, wait } from '@testing-library/react'
import gql from 'graphql-tag'
import React from 'react'
import ErrorProvider from './ErrorProvider'
import Hello from './Hello'
import LoadingProvider from './LoadingProvider'
import SchemaProvider from './SchemaProvider'

test('Hello component with MockedProvider', async () => {
  const mocks = [
    {
      request: {
        query: gql`
          query {
            hello
          }
        `,
      },
      result: {
        data: {
          hello: 'Hello from MockedProvider!',
        },
      },
    },
  ]

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Hello />
    </MockedProvider>,
  )

  await wait()

  expect(getByText('Hello from MockedProvider!')).toBeDefined()
})

test('Hello component with SchemaProvider', async () => {
  const typeDefs = `
  type Query {
    hello: String!
  }
  `

  const { getByText } = render(
    <SchemaProvider
      typeDefs={typeDefs}
      queryResolvers={{
        hello: () => 'Hello from SchemaProvider!',
      }}
    >
      <Hello />
    </SchemaProvider>,
  )

  await wait()

  expect(getByText('Hello from SchemaProvider!')).toBeDefined()
})

test('Renders the loading state', () => {
  const { getByText } = render(
    <LoadingProvider>
      <Hello />
    </LoadingProvider>,
  )

  expect(getByText('Loading...')).toBeDefined()
})

test('Renders the error state', async () => {
  const { getByText } = render(
    <ErrorProvider errors={[{ message: 'Something went wrong' }]}>
      <Hello />
    </ErrorProvider>,
  )

  await wait()

  expect(getByText('GraphQL error: Something went wrong')).toBeDefined()
})
