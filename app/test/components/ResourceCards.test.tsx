import { render } from '@testing-library/react'
import { ResourceCards } from '../../src/components'
import { Resource } from '../../src/interfaces'
import { ResourceFactory } from '../factories'

const renderComponent = (resources: Resource[]) => {
  return render(<ResourceCards resources={resources} />)
}

describe('<ResourceCards />', () => {
  it('should initialize resource cards', async () => {
    const resources = ResourceFactory.buildList(5)

    const { getAllByTestId } = renderComponent(resources)
    const resourceCards = getAllByTestId('ResourceCardDiv')
    expect(resourceCards.length).toEqual(5)
  })
})
