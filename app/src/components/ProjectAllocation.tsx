import styled from '@emotion/styled'
import { formatDate, DateFormat } from 'utils'
import { ResourceAllocation } from 'interfaces'
import {
  SectionTable,
  SectionTableBody,
  SectionTableHeader,
  SectionTableHeaderRow,
  SectionTableRow,
  SectionTableHeaderData,
  SectionTableData,
} from './Section'

const ProjectAllocationContainer = styled.div``

const ProjectAllocationTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0.3rem 0;
`

type ResourceAllocationProps = {
  currentAllocation: ResourceAllocation[]
  pastAllocation: ResourceAllocation[]
}

export const ProjectAllocation = ({
  currentAllocation,
  pastAllocation,
}: ResourceAllocationProps) => {
  return (
    <ProjectAllocationContainer>
      {currentAllocation.length > 0 && (
        <>
          <ProjectAllocationTitle>Current Project(s) </ProjectAllocationTitle>
          <SectionTable>
            <SectionTableHeader>
              <SectionTableHeaderRow>
                <SectionTableHeaderData>Project Title</SectionTableHeaderData>
                <SectionTableHeaderData>Time Allocation</SectionTableHeaderData>
                <SectionTableHeaderData>Start Date</SectionTableHeaderData>
              </SectionTableHeaderRow>
            </SectionTableHeader>
            <SectionTableBody>
              {currentAllocation.map((allocation) => {
                return (
                  <SectionTableRow key={allocation.id}>
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
                  </SectionTableRow>
                )
              })}
            </SectionTableBody>
          </SectionTable>
        </>
      )}
      {pastAllocation.length > 0 && (
        <>
          <ProjectAllocationTitle>Past Project(s) </ProjectAllocationTitle>
          <SectionTable>
            <SectionTableHeader>
              <SectionTableHeaderRow>
                <SectionTableHeaderData>Project Title</SectionTableHeaderData>
                <SectionTableHeaderData>Start Date</SectionTableHeaderData>
                <SectionTableHeaderData>End Date</SectionTableHeaderData>
              </SectionTableHeaderRow>
            </SectionTableHeader>
            <SectionTableBody>
              {pastAllocation.map((allocation) => {
                return (
                  <SectionTableRow key={allocation.id}>
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
                  </SectionTableRow>
                )
              })}
            </SectionTableBody>
          </SectionTable>
        </>
      )}
    </ProjectAllocationContainer>
  )
}
