import { waitFor } from '@testing-library/react'
import { render, applyMockUseMsal, applyMockUseRouter } from '../../testUtils'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { CREATE_PROJECT, UPDATE_PROJECT } from 'queries'
import { ProjectForm } from 'components/projects/ProjectForm'
import { ProjectFactory } from '../../factories'

applyMockUseRouter()

applyMockUseMsal()

// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.mock('utils/hooks/msal', () => require('../../testUtils').mockMsalHook)

describe('<ProjectForm />', () => {
  it('should create a new project with user provided info', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_PROJECT,
        },
        result: {
          data: {
            id: faker.random.uuid,
          },
        },
      },
    ]

    const { getByLabelText } = await render(ProjectForm, {}, mocks, false)

    const [projectName, client, projectType, priority, confidence] = [
      'project-name',
      'client',
      'project-type',
      'priority',
      'confidence',
    ].map((text) => getByLabelText(text))

    await waitFor(() => {
      userEvent.type(projectName, 'Test Project')
      userEvent.type(client, 'Anthem Healthcare')
      userEvent.type(projectType, 'internal')
      userEvent.type(priority, 'High')
      userEvent.type(confidence, '75')
    })
    await new Promise((resolve) => setTimeout(resolve, 0))
  })

  it('should update a project with user provided info', async () => {
    const project = ProjectFactory().build()

    const mocks = [
      {
        request: {
          query: UPDATE_PROJECT,
        },
        result: {
          data: {
            id: project.id,
          },
        },
      },
    ]

    const { getByLabelText } = await render(
      ProjectForm,
      { project },
      mocks,
      false,
    )

    expect(getByLabelText('project-name')).toHaveValue(project.projectName)
    expect(getByLabelText('project-type')).toHaveValue(project.projectType)
    expect(getByLabelText('confidence')).toHaveValue(String(project.confidence))
    expect(getByLabelText('priority')).toHaveValue(project.priority)

    await new Promise((resolve) => setTimeout(resolve, 0))
  })
})
