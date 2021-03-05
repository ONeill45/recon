import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ResourceAllocation } from 'interfaces'

const OuterDiv = styled.div`
  display: grid;
  grid-template-columns: auto 65%;
  grid-template-rows: auto;
  text-align: left;
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
  /* istanbul ignore next */
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
      <OuterDiv>
        <div>Title</div>
        <div>Time Utilization</div>
        {currentAllocation.map((ra) => {
          return (
            <>
              <div key={ra.project.id}>{ra.project.projectName}</div>
              <UtilizationBackgroundDiv>
                <UtilizationInnerDiv percentage={ra.percentage}>
                  {ra.percentage}%
                </UtilizationInnerDiv>
              </UtilizationBackgroundDiv>
            </>
          )
        })}
      </OuterDiv>
    </>
  )
}
