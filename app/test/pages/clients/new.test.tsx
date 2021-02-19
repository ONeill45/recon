import React from 'react'
import NewClient from '../../../src/pages/clients/new'
import { MockedProvider } from '@apollo/client/testing'
import { render } from '@testing-library/react'

describe('New client page test', () => {
  it('should render new client page', async () => {
    const { getByRole } = render(
      <MockedProvider>
        <NewClient />
      </MockedProvider>,
    )

    expect(getByRole('button', { name: 'Submit' })).toBeVisible()
  })
})
