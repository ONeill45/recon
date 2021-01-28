import styled from '@emotion/styled'
import { useState } from 'react'
import { FiFilter } from 'react-icons/fi'
import { css } from '@emotion/react'

import { FilterOption, SearchBar } from './'

type displayProps = {
  displayed: boolean
}

const isDisplayed = ({ displayed }: displayProps) => css`
  display: ${displayed ? 'block' : 'none'};
`

const ExpandedFilterPanel = styled.div<displayProps>`
  ${isDisplayed};
  width: 250px;
  background-color: orange;
`

export const FilterPanel = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <div
        style={{
          width: '20px',
          backgroundColor: 'orange',
          borderRight: '1px solid black',
          alignItems: 'center',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ textAlign: 'center' }}>
          <FiFilter />
          <div style={{ transform: 'rotate(90deg)' }}>Filters</div>
        </div>
      </div>
      <ExpandedFilterPanel displayed={expanded}>
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <SearchBar />
            <FilterOption title={'Clients'} />
            <FilterOption title={'Projects'} />
            <FilterOption title={'Resources'} />
          </div>
        </div>
      </ExpandedFilterPanel>
    </>
  )
}
