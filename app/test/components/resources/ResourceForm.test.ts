import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { ResourceForm } from 'components/resources/ResourceForm'
import { applyMockUseMsal, applyMockUseRouter, render } from '../../testUtils'
import { DepartmentFactory } from '../../factories'
import { GET_DEPARTMENTS, CREATE_RESOURCE } from 'queries'

applyMockUseRouter()

applyMockUseMsal()

// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.mock('utils/hooks/msal', () => require('../../testUtils').mockMsalHook)

describe('<ResourceForm />', () => {
  it('should create a new resource with user provided info', async () => {
    const departments = DepartmentFactory().buildList(4)
    const mocks = [
      {
        request: {
          query: CREATE_RESOURCE,
        },
        result: {
          data: {
            id: faker.datatype.uuid,
          },
        },
      },
      {
        request: {
          query: GET_DEPARTMENTS,
        },
        result: {
          data: {
            departments,
          },
        },
      },
    ]

    const { getByLabelText } = await render(ResourceForm, {}, mocks, false)
    const [firstName, lastName, preferredName, title, imageUrl, email] = [
      'first-name',
      'last-name',
      'preferred-name',
      'title',
      'image-url',
      'email',
    ].map((text) => getByLabelText(text))

    await waitFor(() => {
      userEvent.type(firstName, 'Test Firstname')
      userEvent.type(lastName, 'Test Lastname')
      userEvent.type(preferredName, 'Test PrfName')
      userEvent.type(title, 'Test Title')
      userEvent.type(imageUrl, 'http://test.com')
      userEvent.type(email, 'test@test.com')
    })

    await new Promise((resolve) => setTimeout(resolve, 0))
  })
})
