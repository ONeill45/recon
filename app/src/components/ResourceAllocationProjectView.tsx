import styled from '@emotion/styled'
import { formatDate, DateFormat } from 'utils'
import { ResourceAllocation, Project } from 'interfaces'
import {
  SectionTable,
  SectionTableHeaderRow,
  SectionTableHeaderData,
  SectionTableData,
} from './Section'

const RAProjectViewContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const WeekDayColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  border-right: 1px solid black;
  border-left: 1px solid black;
`

const WeekDayTileContainer = styled.div`
  height: 3.5rem;
  border-bottom: 1px solid #555;
`

const WeekDayTile = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 0.3rem;
`

const LowerContainer = styled.div`
  display: flex;
`

const RARow = styled.div`
  display: flex;
`

const RADetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`

const ProjectDetail = styled.div`
  width: 80%;
`

const ProjectAllocationTile = styled.div``

type ResourceAllocationProjectViewProps = {
  project: Project
}

export const ResourceAllocationProjectView = ({
  project,
}: ResourceAllocationProjectViewProps) => {
  return (
    <RAProjectViewContainer>
      <CalendarContainer>
        <WeekDayColumn>
          <WeekDayTileContainer>
            <WeekDayTile>1</WeekDayTile>
          </WeekDayTileContainer>
          <WeekDayTileContainer>
            <WeekDayTile>2</WeekDayTile>
          </WeekDayTileContainer>
          <WeekDayTileContainer>
            <WeekDayTile>3</WeekDayTile>
          </WeekDayTileContainer>
          <WeekDayTileContainer>
            <WeekDayTile>4</WeekDayTile>
          </WeekDayTileContainer>
        </WeekDayColumn>
      </CalendarContainer>
      {/* <LowerContainer></LowerContainer> */}
    </RAProjectViewContainer>
  )
}
