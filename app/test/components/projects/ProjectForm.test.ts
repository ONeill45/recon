import { act, fireEvent } from '@testing-library/react'
import { render, applyMockUseMsal, applyMockUseRouter } from '../../testUtils'
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
      'project name',
      'client',
      'project type',
      'project priority',
      'confidence',
    ].map((text) => getByLabelText(text))

    act(() => {
      fireEvent.change(projectName, { target: { value: 'Test Project' } })
      fireEvent.change(projectType, { target: { value: 'internal' } })
      fireEvent.change(priority, { target: { value: 'High' } })
      fireEvent.keyDown(confidence, { key: 'ArrowRight', code: 'ArrowRight' })
    })

    expect(projectName).toHaveValue('Test Project')
    expect(projectType).toHaveValue('internal')
    expect(priority).toHaveValue('High')
    expect(confidence.parentElement?.querySelector('input')).toHaveValue('1')
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

    expect(getByLabelText('project name')).toHaveValue(project.projectName)
    expect(getByLabelText('project type')).toHaveValue(project.projectType)
    expect(
      getByLabelText('confidence').parentElement?.querySelector('input'),
    ).toHaveValue(String(project.confidence))
    expect(getByLabelText('project priority')).toHaveValue(project.priority)
  })
})
