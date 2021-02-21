import { render } from '@testing-library/react'
import { ResourceCard } from '../../src/components'
import { Resource } from '../../src/interfaces'
import { ResourceFactory } from '../factories'

const renderComponent = (resource: Resource) =>
  render(<ResourceCard resource={resource} />)

describe('<ResourceCard />', () => {
  it('should initialize resource details', async () => {
    const resource = ResourceFactory.build()
    const { firstName, lastName, title, email, department } = resource

    const { getByText } = renderComponent(resource)
    expect(getByText(`${firstName} ${lastName}`)).toBeVisible()
    expect(getByText(title)).toBeVisible()
    expect(getByText(email)).toBeVisible()
    expect(getByText(department.name)).toBeVisible()
    expect(getByText('Current Project(s):')).toBeVisible()
  })
})
