import styled from '@emotion/styled'
import { useState } from 'react'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'

type filterCategoryProps = {
  title: string
}

export const FilterCategoryHeaderDiv = styled.div`
  height: 40px;
  border: 1px solid black;
`

export const FilterCategoryContentDiv = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`

export const FilterCategory = ({ title }: filterCategoryProps) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <FilterCategoryHeaderDiv onClick={() => setExpanded(!expanded)}>
        {expanded ? <AiOutlineDown /> : <AiOutlineRight />} {title}
      </FilterCategoryHeaderDiv>

      {expanded ? (
        <FilterCategoryContentDiv>
          {/* this is just an example and will be removed/replaced later */}
          <div>
            <input type="checkbox" id="checkbox1" />
            <label htmlFor="checkbox1">Relevant filter option 1</label>
          </div>
          <div>
            <input type="checkbox" id="checkbox2" />
            <label htmlFor="checkbox2">Relevant filter option 2</label>
          </div>
          <div>
            <input type="checkbox" id="checkbox3" />
            <label htmlFor="checkbox3">Relevant filter option 3</label>
          </div>
          <div>
            <input type="checkbox" id="checkbox4" />
            <label htmlFor="checkbox4">Relevant filter option 4</label>
          </div>
        </FilterCategoryContentDiv>
      ) : (
        <div />
      )}
    </>
  )
}
