import { MockedProvider } from '@apollo/react-testing'
import { render, wait } from '@testing-library/react'
import React from 'react'
import Hello, { HELLO_QUERY } from './Hello'
import ErrorProvider from './test-utils/ErrorProvider'
import LoadingProvider from './test-utils/LoadingProvider'
import SchemaProvider from './test-utils/SchemaProvider'

test('Execute query with MockedProvider', async () => {
  const mocks = [
    {
      request: {
        query: HELLO_QUERY,
      },
      result: {
        data: {
          hello: 'Hello world!',
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

  expect(getByText('Hello world!')).toBeDefined()
})

test('Execute query with SchemaProvider', async () => {
  const typeDefs = `
  type Query {
    hello: String!
  }
  `

  const { getByText } = render(
    <SchemaProvider
      typeDefs={typeDefs}
      queryResolvers={{
        hello: () => 'Hello world!',
      }}
    >
      <Hello />
    </SchemaProvider>,
  )

  await wait()

  expect(getByText('Hello world!')).toBeDefined()
})

test('Error state with MockedProvider', async () => {
  const mocks = [
    {
      request: {
        query: HELLO_QUERY,
      },
      error: new Error('Something went wrong'),
    },
  ]

  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Hello />
    </MockedProvider>,
  )

  await wait()

  expect(getByText('Network error: Something went wrong')).toBeDefined()
})

test('Error state with ErrorProvider', async () => {
  const { getByText } = render(
    <ErrorProvider errors={[new Error('Something went wrong')]}>
      <Hello />
    </ErrorProvider>,
  )

  await wait()

  expect(getByText('GraphQL error: Something went wrong')).toBeDefined()
})

test('Loading state with LoadingProvider', () => {
  const { getByText } = render(
    <LoadingProvider>
      <Hello />
    </LoadingProvider>,
  )

  expect(getByText('Loading...')).toBeDefined()
})
