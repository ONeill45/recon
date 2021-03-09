import styled from '@emotion/styled'
import { ResourceAllocation } from 'interfaces'
import { formatDate, DateFormat } from 'utils'

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px;
`
const ProjectInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px;
`

type PastResourceAllocationDetailProps = {
  pastAllocation: ResourceAllocation[]
}

export const PastResourceAllocationDetail = ({
  pastAllocation,
}: PastResourceAllocationDetailProps) => {
  return (
    <>
      <HeaderDiv>
        <div>Title</div>
        <div>Start Date</div>
        <div>End Date</div>
      </HeaderDiv>
      {pastAllocation.map((ra) => {
        return (
          <ProjectInfoDiv key={ra.project.id}>
            <div>{ra.project.projectName}</div>
            <div>{formatDate(ra.startDate, DateFormat.DATE_ONLY)}</div>
            <div>{formatDate(ra.endDate, DateFormat.DATE_ONLY)}</div>
          </ProjectInfoDiv>
        )
      })}
    </>
  )
}
