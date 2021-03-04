import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ResourceAllocation } from 'interfaces'
import { formatDate } from 'utils'

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px;
`
const ProjectInfoDiv = styled.div`
  display: grid;
  grid-template-columns: 20% 50% 30%;
  grid-template-rows: auto;
  padding: 2px;
`
const UtilizationBackgroundDiv = styled.div`
  background-color: lightgray;
  width: 100px;
  text-align: center;
  height: 15px;
`

type utilizationInnerDivProps = {
  percentage: Number
}

const generateUtilizationCSS = ({ percentage }: utilizationInnerDivProps) => {
  const percentageCSS = `width: ${percentage}px;`
  switch (true) {
    case percentage <= 30:
      return css`
        background-color: red;
        height: 15px;
        ${percentageCSS}
      `
    case percentage <= 70:
      return css`
        background-color: blue;
        height: 15px;
        ${percentageCSS}
      `

    case percentage > 70:
      return css`
        background-color: green;
        height: 15px;
        ${percentageCSS}
      `
    default:
      return ''
  }
}

const UtilizationInnerDiv = styled.div`
  ${generateUtilizationCSS}
`

type CurrentResourceAllocationDetailProps = {
  currentAllocation: ResourceAllocation[]
}

export const CurrentResourceAllocationDetail = ({
  currentAllocation,
}: CurrentResourceAllocationDetailProps) => {
  return (
    <>
      <HeaderDiv>
        <div>Title</div>
        <div>Time Utilization</div>
        <div>Start Date</div>
      </HeaderDiv>
      {currentAllocation.map((ra) => {
        return (
          <ProjectInfoDiv key={ra.project.id}>
            <div>{ra.project.projectName}</div>
            <UtilizationBackgroundDiv>
              <UtilizationInnerDiv percentage={ra.percentage}>
                {ra.percentage}%
              </UtilizationInnerDiv>
            </UtilizationBackgroundDiv>
            <div>{formatDate(ra.startDate)}</div>
          </ProjectInfoDiv>
        )
      })}
    </>
  )
}
