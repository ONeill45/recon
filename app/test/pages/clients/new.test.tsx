import React from 'react'
import NewClient from '../../../src/pages/clients/new'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'

describe('New client page test', () => {
  it('should render new client page', async () => {
    render(
      <MockedProvider>
        <NewClient />
      </MockedProvider>,
    )

    expect(screen.getByRole('button', { name: 'Submit' })).toBeVisible()
  })
})
