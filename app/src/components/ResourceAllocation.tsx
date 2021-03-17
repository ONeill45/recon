import styled from '@emotion/styled'
import { formatDate, DateFormat, getDuration } from 'utils'
import { Resource } from 'interfaces'
import {
  SectionTable,
  SectionTableBody,
  SectionTableHeader,
  SectionTableHeaderRow,
  SectionTableRow,
  SectionTableHeaderData,
  SectionTableData,
} from './Section'

const ResourceAllocationContainer = styled.div``

type ResourceAllocationProps = {
  resource: Resource
}

export const ResourceAllocation = ({ resource }: ResourceAllocationProps) => {
  const { department, startDate, terminationDate } = resource
  const duration = getDuration(startDate, terminationDate)

  return (
    <ResourceAllocationContainer>
      <SectionTable>
        <SectionTableHeader>
          <SectionTableHeaderRow>
            <SectionTableHeaderData> Status </SectionTableHeaderData>
            <SectionTableHeaderData> Department </SectionTableHeaderData>
            <SectionTableHeaderData> Hire Date </SectionTableHeaderData>
            <SectionTableHeaderData> Termination Date </SectionTableHeaderData>
            <SectionTableHeaderData> Length of Service </SectionTableHeaderData>
          </SectionTableHeaderRow>
        </SectionTableHeader>
        <SectionTableBody>
          <SectionTableRow>
            <SectionTableData>
              {terminationDate ? 'Terminated' : 'Active'}
            </SectionTableData>
            <SectionTableData>{department.name}</SectionTableData>
            <SectionTableData>
              {formatDate(startDate, DateFormat.DATE_ONLY)}
            </SectionTableData>
            <SectionTableData>
              {terminationDate
                ? formatDate(terminationDate, DateFormat.DATE_ONLY)
                : 'N/A'}
            </SectionTableData>
            <SectionTableData>{duration}</SectionTableData>
          </SectionTableRow>
        </SectionTableBody>
      </SectionTable>
    </ResourceAllocationContainer>
  )
}
