import { waitFor, waitForElementToBeRemoved } from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { ResourceForm, CREATE_RESOURCE } from 'components'
import { applyMockUseMsal, applyMockUseRouter, render } from '../testUtils'

import { GET_ALL_DEPARTMENTS } from 'components/DepartmentDropDown'
import { DepartmentFactory } from '../factories'

applyMockUseRouter()

applyMockUseMsal()

jest.mock('utils/hooks/msal', () => require('../testUtils').mockMsalHook)

describe('<ResourceForm />', () => {
  it('should create a new resource with user provided info', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_RESOURCE,
        },
        result: {
          data: {
            id: faker.random.uuid,
          },
        },
      },
    ]

    const departments = DepartmentFactory.buildList(1)

    const departmentsMocks = [
      {
        request: {
          query: GET_ALL_DEPARTMENTS,
        },
        result: {
          data: {
            departments,
          },
        },
      },
    ]

    //const { getByText } = await render(DepartmentDropDown, {}, departmentsMocks)
    const { getByLabelText, getByText } = await render(
      ResourceForm,
      {},
      [...mocks, ...departmentsMocks],
      false,
    )
    await waitForElementToBeRemoved(() => getByText('Loading...'))
    const [
      firstName,
      lastName,
      preferredName,
      title,
      department,
      imageUrl,
      email,
    ] = [
      'first-name',
      'last-name',
      'preferred-name',
      'title',
      'department-select',
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
      userEvent.selectOptions(department, getByText(`${departments[0].name}`))
    })
    await new Promise((resolve) => setTimeout(resolve, 0))
  })
})
