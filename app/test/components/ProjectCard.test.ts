import userEvent from '@testing-library/user-event'

import { ProjectCard } from 'components'
import { ProjectFactory } from '../factories'
import { applyMockUseRouter, mockUseRouter, render } from '../testUtils'
import { getRelativeTime } from 'utils'

applyMockUseRouter()

describe('<ProjectCard />', () => {
  it('should initialize project details', async () => {
    const project = ProjectFactory.build()
    const {
      projectName,
      client: { clientName },
      projectType,
      startDate,
      endDate,
    } = project

    const { getByText } = await render(ProjectCard, { project })
    expect(getByText(projectName)).toBeVisible()
    expect(getByText(clientName)).toBeVisible()
    expect(getByText(projectType)).toBeVisible()
    expect(getByText(getRelativeTime(startDate, endDate))).toBeVisible()
  })
  it('should route to appropriate project page when its card is clicked', async () => {
    const project = ProjectFactory.build()
    const { id, projectName } = project

    const { getByText } = await render(ProjectCard, { project })

    userEvent.click(getByText(`${projectName}`))
    expect(mockUseRouter.push).toHaveBeenCalledWith({
      pathname: '/projects/[id]',
      query: { id },
    })
  })
})
