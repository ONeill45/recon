import { DepartmentDropDown, GET_ALL_DEPARTMENTS } from 'components'
import { applyMockUseRouter, render } from '../testUtils'
import { DepartmentFactory } from '../factories'

applyMockUseRouter()

describe('<DepartmentDropDown />', () => {
  it('should populate dropdown with departments', async () => {
    const departments = DepartmentFactory.buildList(1)

    const mocks = [
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

    const { getByLabelText } = await render(DepartmentDropDown, {}, mocks)
    const dropDown = getByLabelText('department-select')
    expect(dropDown).toHaveLength(1)
  })
})
