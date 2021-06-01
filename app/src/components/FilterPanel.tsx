import React, { useMemo, useState } from 'react'
import styled from '@emotion/styled'
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
  width: 400px;
  background-color: orange;
  flex-direction: column;
`

const filterCategoryProperties = [
  {
    title: 'Clients',
    children: [
      { field: 'startDate', type: 'date', label: 'Start Date' },
      { field: 'terminationDate', type: 'date', label: 'Termination Date' },
    ],
  },
  {
    title: 'Projects',
    children: [
      { field: 'clientNames', type: 'checkbox', label: 'Client Name' },
      { field: 'confidence', type: 'number', label: 'Confidence' },
      { field: 'priorities', type: 'checkbox', label: 'Priority' },
      { field: 'projectTypes', type: 'checkbox', label: 'Project Type' },
      { field: 'startDate', type: 'date', label: 'Start Date' },
      { field: 'endDate', type: 'date', label: 'End Date' },
    ],
  },
  {
    title: 'Resources',
    children: [
      { field: 'title', type: 'checkbox', label: 'Title' },
      { field: 'departmentName', type: 'checkbox', label: 'Department Name' },
      { field: 'project', type: 'checkbox', label: 'Project' },
      { field: 'clients', type: 'checkbox', label: 'Client' },
      { field: 'skills', type: 'checkbox', label: 'Skill' },
      { field: 'startDate', type: 'date', label: 'Start Date' },
      { field: 'endDate', type: 'date', label: 'Termination Date' },
    ],
  },
]

type FilterPanelProps = {
  page?: string | null | undefined
  filterItems?: { [key: string]: any } | undefined
  onFilter?: (queryData: { [key: string]: any }) => void
  setSearchText?: (s: string) => void
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const FilterPanel = ({
  page,
  onFilter,
  filterItems,
}: FilterPanelProps) => {
  const [expanded, setExpanded] = useState(false)
  const [searchText, onSetSearchText] = useState<string | undefined>(undefined)

  const onHandleSearch = (text: string) => {
    onSetSearchText(text)
    if (onFilter) {
      onFilter({ searchItem: text })
    }
  }

  const filterCategories = useMemo(() => {
    if (page) {
      return filterCategoryProperties.filter((item) => item.title === page)
    }
    return filterCategoryProperties
  }, [page])

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
        <SearchBar setSearchText={onHandleSearch} searchQuery={searchText} />
        {filterCategories.map((property: any) => (
          <div key={property.title}>
            <FilterCategory
              title={property.title}
              fields={property.children}
              filterItems={filterItems}
              onChange={onFilter}
            />
          </div>
        ))}
      </ExpandedFilterPanelDiv>
    </>
  )
}
