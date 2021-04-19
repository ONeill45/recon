import styled from '@emotion/styled'
import { useState } from 'react'
import { css } from '@emotion/react'
import { FiFilter } from 'react-icons/fi'

import { FilterCategory, SearchBar } from './'

type displayProps = {
  displayed: boolean
}

export const SideFilterPanelDiv = styled.div`
  width: 20px;
  background-color: orange;
  border-right: 1px solid black;
  align-items: center;
`
const SideFilterPanelContentDiv = styled.div`
  text-align: center;
`

const FiltersTextDiv = styled.div`
  transform: rotate(90deg);
`

const isDisplayed = ({ displayed }: displayProps) => css`
  display: ${displayed ? 'flex' : 'none'};
`

export const ExpandedFilterPanelDiv = styled.div<displayProps>`
  ${isDisplayed};
  width: 250px;
  background-color: orange;
  flex-direction: column;
`

const filterCategoryProperties = [
  {
    title: 'Clients',
    children: [
      { field: 'startDate', type: 'date', label: 'Start Date' },
      { field: 'endDate', type: 'date', label: 'endYear' },
    ],
  },
  {
    title: 'Projects',
  },
  {
    title: 'Resources',
  },
]

type FilterPanelProps = {
  page?: String | null | undefined
  filterItems?: { [key: string]: any } | undefined
  onFilter: (queryData: { [key: string]: any }) => void
}

export const FilterPanel = (props: FilterPanelProps) => {
  const { page, filterItems, onFilter } = props
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <SideFilterPanelDiv
        data-testid="SideFilterPanel"
        onClick={() => setExpanded(!expanded)}
      >
        <SideFilterPanelContentDiv>
          <FiFilter />
          <FiltersTextDiv>Filters</FiltersTextDiv>
        </SideFilterPanelContentDiv>
      </SideFilterPanelDiv>
      <ExpandedFilterPanelDiv
        data-testid="ExpandedFilterPanel"
        displayed={expanded}
      >
        <SearchBar />
        {filterCategoryProperties.map((property) => (
          <FilterCategory key={property.title} title={property.title} />
        ))}
      </ExpandedFilterPanelDiv>
    </>
  )
}
