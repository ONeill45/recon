import React from 'react'
import styled from '@emotion/styled'

type barProps = {
  height: number
}

const HistogramContainer = styled.div`
  width: max-content;
  min-width: 50px;
  height: 400px;
  padding: 3rem;
  background-color: #ffe3b8;
  border-radius: 1rem;
`

const InnerChart = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: wrap-reverse;
`

const Bar = styled.div<barProps>`
  position: relative;
  height: ${(props) => props.height}%;
  width: 75px;
  margin-left: 30px;
  background-color: #ff9900;
  border-radius: 1rem;

  &:nth-of-type(1) {
    margin-left: 0;
  }
`

const YAxisBounds = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  position: absolute;
  left: -1.5rem;

  &:nth-of-type(1) {
    top: 0;
  }

  &:nth-of-type(2) {
    bottom: 0;
    left: -1.2rem;
  }
`

const SkillTitles = styled.div`
  position: absolute;
  bottom: -2rem;
  font-size: 0.8rem;
  width: 75px;
  text-align: center;
`

const SkillSpan = styled.span`
  display: inline-block;
`

const SkillValues = styled.div`
  position: absolute;
  top: -20px;
  font-size: 0.8rem;
  width: 75px;
  text-align: center;
`

const SkillValueSpan = styled.span`
  display: inline-block;
`

export type Skills = {
  skills: { skillName: string; value: number }[]
}

export const Histogram = ({ skills }: Skills) => {
  return (
    <HistogramContainer>
      <InnerChart>
        <YAxisBounds>10</YAxisBounds>
        {skills.map((skill, i) => {
          return (
            <Bar key={i} height={skill.value * 10}>
              <SkillValues>
                <SkillValueSpan>{skill.value}</SkillValueSpan>
              </SkillValues>
              <SkillTitles>
                <SkillSpan>{skill.skillName}</SkillSpan>
              </SkillTitles>
            </Bar>
          )
        })}
        <YAxisBounds>0</YAxisBounds>
      </InnerChart>
    </HistogramContainer>
  )
}
