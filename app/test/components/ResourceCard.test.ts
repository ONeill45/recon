import faker from 'faker'
import { ResourceCard } from 'components'
import { ResourceFactory } from '../factories'
import { applyMockUseRouter, mockUseRouter, render } from '../testUtils'
import userEvent from '@testing-library/user-event'

applyMockUseRouter()

describe('<ResourceCard />', () => {
  it('should initialize resource details', async () => {
    const resource = ResourceFactory.build()
    const { firstName, lastName, title, email, department, imageUrl } = resource

    const { getByText, getByRole } = await render(ResourceCard, { resource })
    expect(getByText(`${firstName} ${lastName}`)).toBeVisible()
    expect(getByText(title)).toBeVisible()
    expect(getByText(email)).toBeVisible()
    expect(getByText(department.name)).toBeVisible()
    expect(getByText('Current Project(s):')).toBeVisible()
    expect(getByRole('img')).toHaveProperty('src', imageUrl)
  })
  it('should initialize resource details with preferred name', async () => {
    const resource = ResourceFactory.build({
      preferredName: faker.name.firstName(),
    })
    const {
      firstName,
      preferredName,
      lastName,
      title,
      email,
      department,
    } = resource

    const { queryByText, getByText } = await render(ResourceCard, { resource })
    expect(queryByText(`${firstName} ${lastName}`)).toBeNull()
    expect(getByText(`${preferredName} ${lastName}`)).toBeVisible()
    expect(getByText(title)).toBeVisible()
    expect(getByText(email)).toBeVisible()
    expect(getByText(department.name)).toBeVisible()
    expect(getByText('Current Project(s):')).toBeVisible()
  })
  it('should initialize resource details with default image', async () => {
    const resource = ResourceFactory.build({
      imageUrl: null,
    })
    const { firstName, lastName, title, email, department } = resource

    const { getByRole, getByText } = await render(ResourceCard, { resource })

    expect(getByText(`${firstName} ${lastName}`)).toBeVisible()
    expect(getByText(title)).toBeVisible()
    expect(getByText(email)).toBeVisible()
    expect(getByText(department.name)).toBeVisible()
    expect(getByText('Current Project(s):')).toBeVisible()
    expect(getByRole('img')).toHaveProperty(
      'src',
      'http://localhost/images/default-avatar-500x500.png',
    )
  })
  it('should route to appropriate resource page when its card is clicked', async () => {
    const resource = ResourceFactory.build()
    const { id, email } = resource

    const { getByText } = await render(ResourceCard, { resource })

    userEvent.click(getByText(`${email}`))
    expect(mockUseRouter.push).toHaveBeenCalledWith({
      pathname: '/resources/[id]',
      query: { id },
    })
  })
})
