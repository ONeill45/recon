import styled from '@emotion/styled'
import { formatDate, DateFormat } from 'utils'
import { ResourceAllocation } from 'interfaces'
import {
  SectionTable,
  SectionTableHeaderRow,
  SectionTableHeaderData,
  SectionTableData,
} from 'components/Section'

const ProjectAllocationContainer = styled.div``

const ProjectAllocationTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0.3rem 0;
`

type ResourceAllocationProps = {
  currentAllocations: ResourceAllocation[]
  pastAllocations: ResourceAllocation[]
}

export const ProjectAllocation: React.FC<ResourceAllocationProps> = ({
  currentAllocations,
  pastAllocations,
}) => {
  return (
    <ProjectAllocationContainer>
      {currentAllocations && (
        <>
          <ProjectAllocationTitle>Current Project(s) </ProjectAllocationTitle>
          <SectionTable>
            <thead>
              <SectionTableHeaderRow>
                <SectionTableHeaderData>Project Title</SectionTableHeaderData>
                <SectionTableHeaderData>Time Allocation</SectionTableHeaderData>
                <SectionTableHeaderData>Start Date</SectionTableHeaderData>
              </SectionTableHeaderRow>
            </thead>
            <tbody>
              {currentAllocations.map((allocation: ResourceAllocation) => {
                return (
                  <tr key={allocation.id}>
                    <SectionTableData>
                      {allocation.project.projectName}
                    </SectionTableData>
                    <SectionTableData>
                      {allocation.percentage}%
                    </SectionTableData>
                    <SectionTableData>
                      {allocation.startDate
                        ? formatDate(allocation.startDate, DateFormat.DATE_ONLY)
                        : '--'}
                    </SectionTableData>
                  </tr>
                )
              })}
            </tbody>
          </SectionTable>
        </>
      )}
      {pastAllocations && (
        <>
          <ProjectAllocationTitle>Past Project(s) </ProjectAllocationTitle>
          <SectionTable>
            <thead>
              <SectionTableHeaderRow>
                <SectionTableHeaderData>Project Title</SectionTableHeaderData>
                <SectionTableHeaderData>Start Date</SectionTableHeaderData>
                <SectionTableHeaderData>End Date</SectionTableHeaderData>
              </SectionTableHeaderRow>
            </thead>
            <tbody>
              {pastAllocations.map((allocation: ResourceAllocation) => {
                return (
                  <tr key={allocation.id}>
                    <SectionTableData>
                      {allocation.project.projectName
                        ? allocation.project.projectName
                        : '--'}
                    </SectionTableData>
                    <SectionTableData>
                      {allocation.startDate
                        ? formatDate(allocation.startDate, DateFormat.DATE_ONLY)
                        : '--'}
                    </SectionTableData>
                    <SectionTableData>
                      {allocation.endDate
                        ? formatDate(allocation.endDate, DateFormat.DATE_ONLY)
                        : '--'}
                    </SectionTableData>
                  </tr>
                )
              })}
            </tbody>
          </SectionTable>
        </>
      )}
    </ProjectAllocationContainer>
  )
}
