import { ProjectHeader } from 'components'
import { ProjectFactory } from '../factories'
import { render } from '../testUtils'

describe('<ProjectHeader />', () => {
  it('should initialize project header', async () => {
    const project = ProjectFactory.build()
    const { projectName } = project

    const { getByText } = await render(ProjectHeader, { project })
    expect(getByText(projectName)).toBeVisible()
  })
})
