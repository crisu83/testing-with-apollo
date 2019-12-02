import { render, wait } from '@testing-library/react'
import React from 'react'
import ErrorProvider from './ErrorProvider'
import Hello from './Hello'
import LoadingProvider from './LoadingProvider'
import SchemaProvider from './SchemaProvider'

const typeDefs = `
type Query {
  hello: String!
}
`

test('Renders the Hello component', async () => {
  const { getByText } = render(
    <SchemaProvider
      typeDefs={typeDefs}
      queryResolvers={{
        hello: () => 'Hello from the schema provider!',
      }}
    >
      <Hello />
    </SchemaProvider>,
  )

  await wait()

  expect(getByText('Hello from the schema provider!')).toBeDefined()
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
