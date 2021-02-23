import { ResourceCard } from 'components'
import { ResourceFactory } from '../factories'
import { renderComponent } from '../testUtils'

describe('<ResourceCard />', () => {
  it('should initialize resource details', async () => {
    const resource = ResourceFactory.build()
    const { firstName, lastName, title, email, department } = resource

    const { getByText } = await renderComponent(ResourceCard, { resource })
    expect(getByText(`${firstName} ${lastName}`)).toBeVisible()
    expect(getByText(title)).toBeVisible()
    expect(getByText(email)).toBeVisible()
    expect(getByText(department.name)).toBeVisible()
    expect(getByText('Current Project(s):')).toBeVisible()
  })
})
