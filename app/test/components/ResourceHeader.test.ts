import faker from 'faker'

import { ResourceHeader } from 'components'
import { ResourceFactory } from '../factories'
import { render } from '../testUtils'

describe('<ResourceHeader />', () => {
  it('should initialize resource details', async () => {
    const resource = ResourceFactory().build()
    const { firstName, lastName, title, email, imageUrl } = resource

    const { getByText, getByRole } = await render(ResourceHeader, { resource })
    expect(getByText(`${firstName} ${lastName}`)).toBeVisible()
    expect(getByText(title)).toBeVisible()
    expect(getByText(email)).toBeVisible()
    expect(getByRole('img')).toHaveProperty('src', imageUrl)
  })
  it('should initialize resource details with preferred name', async () => {
    const resource = ResourceFactory().build({
      preferredName: faker.name.firstName(),
    })
    const { preferredName, lastName, title, email, imageUrl } = resource

    const { getByText, getByRole } = await render(ResourceHeader, { resource })
    expect(getByText(`${preferredName} ${lastName}`)).toBeVisible()
    expect(getByText(title)).toBeVisible()
    expect(getByText(email)).toBeVisible()
    expect(getByRole('img')).toHaveProperty('src', imageUrl)
  })
  it('should initialize resource details with default image', async () => {
    const resource = ResourceFactory().build({
      imageUrl: null,
    })
    const { firstName, lastName, title, email } = resource

    const { getByRole, getByText } = await render(ResourceHeader, { resource })

    expect(getByText(`${firstName} ${lastName}`)).toBeVisible()
    expect(getByText(title)).toBeVisible()
    expect(getByText(email)).toBeVisible()
    expect(getByRole('img')).toHaveProperty(
      'src',
      'http://localhost/images/default-avatar-500x500.png',
    )
  })
})
