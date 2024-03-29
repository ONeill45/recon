import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import { Project, ResourceAssignment, ResourceAllocation } from 'interfaces'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import {
  format,
  getDate,
  addWeeks,
  subWeeks,
  startOfWeek,
  endOfWeek,
  lastDayOfMonth,
  differenceInDays,
  compareAsc,
} from 'date-fns'

type ResourceTileProps = {
  width: number
  margin: number
}

type ContainerProps = {
  display: boolean
}

type ResourceSubtitleProps = {
  isRoleSubtitle: boolean
}

const Container = styled.div<ContainerProps>`
  display: ${(props) => (props.display ? 'block' : 'none')};
  margin: 0 1rem;
  width: 90%;
  max-width: 1200px;
`

const RAProjectViewContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 15% repeat(7, 2fr);
  grid-template-rows: auto;
`

const BackgroundGrid = styled.div`
  display: flex;
  position: absolute;
  justify-content: flex-start;
  width: 85%;
  margin-left: 15%;
  margin-top: 4.5rem;
  height: calc(100% - 4.5rem);
  z-index: -1;
`

const BackgroundGridColumn = styled.div`
  width: calc(100% / 7);
  border-right: 1px solid #ccc;
`

const ResourceTitleColumn = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: 0.7rem 0;
  border-bottom: 2px solid #000;
  border-right: 1px solid #555;
`

const ResourceAllocationRow = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 2 / 9;
  padding: 0.7rem 0;
  background: transparent;
  border-bottom: 2px solid #000;
`

const WeekDayColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  border-right: 1px solid #aaa;
`

const WeekDayTileContainer = styled.div`
  height: 4.5rem;
  width: 100%;
  padding: 1.2rem 0;
  border-bottom: 1px solid #555;
`

const WeekDayTile = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 0.3rem;
  text-align: center;
  border: 1px solid #aaa;
  padding-top: 0.2rem;
  margin: 0 auto;
`

const ResourceTile = styled.div<ResourceTileProps>`
  width: ${(props) => props.width + '%'};
  margin: 0.7rem 0;
  margin-left: ${(props) => props.margin + '%'};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid #808080;
  padding: 0.3rem;
`

const ResourceTileTitle = styled.div`
  font-weight: 700;
`

const ResourceSubtitle = styled.div<ResourceSubtitleProps>`
  color: #808080;
  font-size: 0.8rem;
  font-weight: 400;
`

const WeekContainer = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  padding: 0.4rem 0;
  text-align: center;
`

export const ArrowButton = styled.button`
  height: 1.5rem;
  background: none;
  border: none;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`

const DateContainer = styled.div`
  display: inline-block;
  font-weight: bold;
  letter-spacing: 0.05rem;

  &:nth-of-type(2) {
    margin-left: 0.4rem;
  }
`

const EmptyTableTextContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`

type ResourceAllocationProjectViewProps = {
  project: Project
}

export const ResourceAllocationProjectView: React.FC<ResourceAllocationProjectViewProps> =
  ({ project }) => {
    const { resourceAllocations } = project
    const [displayTable, setDisplayTable] = useState<boolean>(false)
    const [activeDate, setActiveDate] = useState<Date>(new Date())
    const [activeDay, setActiveDay] = useState<number>(1)
    const [activeMonth, setActiveMonth] = useState<number>(1)
    const [activeYear, setActiveYear] = useState<number>(2000)
    const [daysArray, setDaysArray] = useState<Array<number> | undefined>(
      undefined,
    )

    const [startOfCurrentWeek, setStartOfCurrentWeek] = useState<Date>(
      new Date(2000, 1, 1),
    )
    const [endOfCurrentWeek, setEndOfCurrentWeek] = useState<Date>(
      new Date(2000, 1, 8),
    )

    console.log('RESOURCE ALLOCATIONS: ', resourceAllocations)

    const getDayMonthYear = (date: Date) => {
      const currentDate = date
      const currentDay = currentDate.getDate()
      const currentMonth = currentDate.getMonth()
      const currentYear = currentDate.getFullYear()

      return {
        day: currentDay,
        month: currentMonth,
        year: currentYear,
      }
    }

    const updateDateVariables = (date: Date) => {
      const { day, month, year } = getDayMonthYear(date)
      const startWeek = startOfWeek(new Date(year, month, day))
      const endWeek = endOfWeek(new Date(year, month, day))

      setActiveDay(day)
      setActiveMonth(month)
      setActiveYear(year)

      setStartOfCurrentWeek(startWeek)
      setEndOfCurrentWeek(endWeek)
    }

    useEffect(() => {
      updateDateVariables(activeDate)
    }, [activeDate])

    useEffect(() => {
      const tempArray = []
      const startWeek = getDate(startOfCurrentWeek)
      const endWeek = getDate(endOfCurrentWeek)
      const lastDayInMonth = lastDayOfMonth(new Date(startOfCurrentWeek))
      const dayDiffTillEndOfMonth = differenceInDays(
        lastDayInMonth,
        new Date(startOfCurrentWeek),
      )
      const lastDayInMonthNumber = getDate(lastDayInMonth)
      const dayRemainder = 7 - dayDiffTillEndOfMonth
      if (dayDiffTillEndOfMonth < 7) {
        for (let i = startWeek; i <= lastDayInMonthNumber; i++) {
          tempArray.push(i)
        }
        for (let i = 1; i < dayRemainder; i++) {
          tempArray.push(i)
        }
      } else {
        for (let i = startWeek; i <= endWeek; i++) {
          tempArray.push(i)
        }
      }
      setDaysArray(tempArray)
      setDisplayTable(displayResourceAllocations(resourceAllocations))
    }, [startOfCurrentWeek, endOfCurrentWeek])

    const decrementTimeInterval = () => {
      const startWeek = subWeeks(
        new Date(activeYear, activeMonth, activeDay),
        1,
      )
      setActiveDate(startWeek)
    }

    const incrementTimeInterval = () => {
      const endWeek = addWeeks(new Date(activeYear, activeMonth, activeDay), 1)
      setActiveDate(endWeek)
    }

    const formatDate = (date: Date, formatString: string) => {
      return date ? format(new Date(date), formatString) : ''
    }

    const isInDateRange = (
      dateToCompare: Date,
      lowBoundDate: Date,
      highBoundDate: Date,
    ) => {
      return (
        compareAsc(new Date(dateToCompare), new Date(lowBoundDate)) >= 0 &&
        compareAsc(new Date(dateToCompare), new Date(highBoundDate)) <= 0
      )
    }

    const getRowWidthPercentage = (date: Date, isEndDate: boolean) => {
      let percent = 100
      const dateInRangeCheck = isInDateRange(
        date,
        startOfCurrentWeek,
        endOfCurrentWeek,
      )
      if (dateInRangeCheck) {
        let dayDiff = differenceInDays(
          new Date(date),
          new Date(startOfCurrentWeek),
        )
        isEndDate ? dayDiff++ : dayDiff
        percent = (dayDiff / 7) * 100
      }
      return percent
    }

    const getResourceTileMargin = (startDate: Date, endDate: Date) => {
      const startDateRowWidth = getRowWidthPercentage(startDate, false)
      const endDateRowWidth = getRowWidthPercentage(endDate, true)
      return startDateRowWidth < 100 && endDateRowWidth === 100
        ? getRowWidthPercentage(startDate, false)
        : 0
    }

    const getResourceTileWidth = (startDate: Date, endDate: Date) => {
      let percent = 100
      if (endDate) {
        const width = getRowWidthPercentage(endDate, true)
        if (width < 100) {
          percent = width
        }
      }

      if (startDate) {
        const width = getRowWidthPercentage(startDate, false)
        if (width < 100) {
          percent = 100 - width
        }
      }

      return percent
    }

    const displayInRangeItem = (startDate: Date, endDate: Date) => {
      return (
        isInDateRange(activeDate, startDate, endDate) ||
        isInDateRange(startDate, startOfCurrentWeek, endOfCurrentWeek) ||
        isInDateRange(endDate, startOfCurrentWeek, endOfCurrentWeek)
      )
    }

    const displayResourceAllocationRow = (
      assignments: ResourceAssignment[],
    ) => {
      let display = false
      assignments?.map((assignment: ResourceAssignment) => {
        if (displayInRangeItem(assignment.startDate, assignment.endDate)) {
          display = true
          return
        }
      })

      return display
    }

    const displayResourceAllocations = (
      resourceAllocations: ResourceAllocation[],
    ) => {
      let display = false
      resourceAllocations?.map((ra: ResourceAllocation) => {
        if (displayInRangeItem(ra.startDate, ra.endDate)) {
          display = true
          return
        }
      })

      return display
    }

    return (
      <Container display={resourceAllocations?.length > 0}>
        <WeekContainer>
          <ArrowButton onClick={() => decrementTimeInterval()}>
            <RiArrowLeftSLine size={24} />
          </ArrowButton>
          <DateContainer>
            {formatDate(startOfCurrentWeek, 'MM/dd/yyyy')} -{' '}
          </DateContainer>
          <DateContainer>
            {formatDate(endOfCurrentWeek, 'MM/dd/yyyy')}
          </DateContainer>
          <ArrowButton onClick={() => incrementTimeInterval()}>
            <RiArrowRightSLine size={24} />
          </ArrowButton>
        </WeekContainer>
        <RAProjectViewContainer>
          <BackgroundGrid>
            {daysArray?.map(() => (
              <BackgroundGridColumn />
            ))}
          </BackgroundGrid>
          <ResourceTitleColumn />
          {daysArray?.map((day: number) => (
            <WeekDayColumn>
              <WeekDayTileContainer>
                <WeekDayTile>{day}</WeekDayTile>
              </WeekDayTileContainer>
            </WeekDayColumn>
          ))}
          {displayTable ? (
            resourceAllocations.map(
              (r: ResourceAllocation) =>
                displayResourceAllocationRow(r.assignments) && (
                  <>
                    <ResourceTitleColumn>
                      <ResourceTileTitle>{r.role}</ResourceTileTitle>
                      <ResourceSubtitle isRoleSubtitle={true}>
                        {formatDate(r.startDate, 'MM/dd/yyyy')} -{' '}
                        {r.endDate
                          ? formatDate(r.endDate, 'MM/dd/yyyy')
                          : 'N/A'}
                      </ResourceSubtitle>
                    </ResourceTitleColumn>
                    <ResourceAllocationRow>
                      {r.assignments.map(
                        (assignment: ResourceAssignment) =>
                          displayInRangeItem(
                            assignment.startDate,
                            assignment.endDate,
                          ) && (
                            <ResourceTile
                              key={assignment.id}
                              margin={getResourceTileMargin(
                                assignment.startDate,
                                assignment.endDate,
                              )}
                              width={getResourceTileWidth(
                                assignment.startDate,
                                assignment.endDate,
                              )}
                            >
                              <ResourceTileTitle>
                                {assignment.resource.preferredName ||
                                  assignment.resource.firstName}{' '}
                                {assignment.resource.lastName}
                              </ResourceTileTitle>
                              <ResourceSubtitle isRoleSubtitle={false}>
                                {assignment.percentage + '% allocated'}
                              </ResourceSubtitle>
                              <ResourceSubtitle isRoleSubtitle={false}>
                                {formatDate(assignment.startDate, 'MM/dd/yyyy')}{' '}
                                -{' '}
                                {r.endDate
                                  ? formatDate(assignment.endDate, 'MM/dd/yyyy')
                                  : 'No scheduled end date'}
                              </ResourceSubtitle>
                            </ResourceTile>
                          ),
                      )}
                    </ResourceAllocationRow>
                  </>
                ),
            )
          ) : (
            <>
              <ResourceTitleColumn />
              <ResourceAllocationRow>
                <EmptyTableTextContainer>
                  No resource allocations in this date range
                </EmptyTableTextContainer>
              </ResourceAllocationRow>
            </>
          )}
        </RAProjectViewContainer>
      </Container>
    )
  }
