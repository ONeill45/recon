import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'
// import { gql, useLazyQuery, useQuery } from '@apollo/client'

type filterCategoryProps = {
  title: string
  fields: Array<{ [key: string]: any }> | undefined
  filterItems: { [key: string]: any } | undefined
  onChange?: (queryData: { [key: string]: string }) => void
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

export const FilterItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 5px 0 5px;
`

export const FilterSubmitDIv = styled.div`
  margin: 5px;
  text-align: center;
`

export const FilterItemLabel = styled.label`
  font-size: 15px;
`

export const FilterItemInput = styled.input``

export const FilterSubmitButton = styled.button`
  width: 100px;
`

export const FilterCheckItemDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 15px;
`

export const FilterCategory = ({
  title,
  fields,
  onChange,
  filterItems,
}: filterCategoryProps) => {
  const [expanded, setExpanded] = useState(false)
  const queryData: { [key: string]: any } = {}

  const handleOnChangeCheckBox = ({
    target,
    field,
    name,
  }: {
    [key: string]: any
  }) => {
    if (target && target.checked === true) {
      if (!queryData[field]) {
        queryData[field] = name
      } else {
        queryData[field] = queryData[field].concat(`, ${name}`)
      }
    } else {
      queryData[field] = queryData[field].filter(
        (item: string) => item !== name,
      )
    }
  }

  const handleOnChange = (value: string, field: string) => {
    queryData[field] = value
  }

  const [clients, setCleints] = useState<Array<string>>([])
  const [projects, setProjects] = useState<Array<string>>([])
  const [departments, setDepartments] = useState<Array<string>>([])
  const [titles, setTitles] = useState<Array<string>>([])
  const [skills, setSkills] = useState<Array<string>>([])

  useEffect(() => {
    if (filterItems && filterItems.clients) {
      setCleints(filterItems.clients)
    }
    if (filterItems && filterItems.projects) {
      setProjects(filterItems.projects)
    }
    if (filterItems && filterItems.departments) {
      setDepartments(filterItems.departments)
    }
    if (filterItems && filterItems.titles) {
      setTitles(filterItems.titles)
    }
    if (filterItems && filterItems.skills) {
      setSkills(filterItems.skills)
    }
  }, [])

  const onFilter = () => {
    if (onChange) {
      onChange(queryData)
    }
  }

  const selectRenderItems = (field: string): Array<string> | null => {
    if (field === 'project') return projects
    if (field === 'clients') return clients
    if (field === 'departmentName') return departments
    if (field === 'title') return titles
    if (field === 'skills') return skills
    return null
  }

  const renderFilterItem = (item: {
    field: string
    type: string
    label: string
  }) => {
    if (item.type === 'checkbox' && selectRenderItems(item.field)) {
      const items = selectRenderItems(item.field)

      if (items && items.length) {
        return (
          <>
            <FilterItemDiv>
              <FilterItemLabel>{item.label}</FilterItemLabel>
            </FilterItemDiv>
            {items &&
              items.map((name: string) => (
                <FilterCheckItemDiv>
                  <FilterItemInput
                    type="checkbox"
                    id={`${item.type}-${item.field}-${name}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleOnChangeCheckBox({
                        target: {
                          name: e.target?.name,
                          checked: e.target?.checked,
                        },
                        field: item.field,
                        name,
                      })
                    }}
                  />
                  <FilterItemLabel
                    htmlFor={`${item.type}-${item.field}-${name}`}
                  >
                    {name}
                  </FilterItemLabel>
                </FilterCheckItemDiv>
              ))}
          </>
        )
      }
      return null
    }
    return (
      <FilterItemDiv>
        <FilterItemLabel htmlFor={`${item.type}-${item.field}`}>
          {item.label}
        </FilterItemLabel>
        <FilterItemInput
          type={item.type}
          id={`${item.type}-${item.field}`}
          onChange={(e) => handleOnChange(e.target?.value, item.field)}
        />
      </FilterItemDiv>
    )
  }
  return (
    <>
      <FilterCategoryHeaderDiv onClick={() => setExpanded(!expanded)}>
        {expanded ? <AiOutlineDown /> : <AiOutlineRight />} {title}
      </FilterCategoryHeaderDiv>

      {expanded ? (
        <FilterCategoryContentDiv data-testid="FilterCategoryContent">
          {fields ? (
            fields.map((item: { field: string; type: string; label: string }) =>
              renderFilterItem(item),
            )
          ) : (
            <>
              <FilterItemDiv>
                <FilterItemLabel htmlFor="checkbox1">
                  Relevant filter option 1
                </FilterItemLabel>
                <FilterItemInput type="checkbox" id="checkbox1" />
              </FilterItemDiv>
              <FilterItemDiv>
                <FilterItemLabel htmlFor="checkbox2">
                  Relevant filter option 2
                </FilterItemLabel>
                <FilterItemInput type="checkbox" id="checkbox2" />
              </FilterItemDiv>
              <FilterItemDiv>
                <FilterItemLabel htmlFor="checkbox3">
                  Relevant filter option 3
                </FilterItemLabel>
                <FilterItemInput type="checkbox" id="checkbox3" />
              </FilterItemDiv>
              <FilterItemDiv>
                <FilterItemLabel htmlFor="checkbox4">
                  Relevant filter option 4
                </FilterItemLabel>
                <FilterItemInput type="checkbox" id="checkbox4" />
              </FilterItemDiv>
            </>
          )}
          <FilterSubmitDIv>
            <FilterSubmitButton type="button" onClick={onFilter}>
              Filter
            </FilterSubmitButton>
          </FilterSubmitDIv>
        </FilterCategoryContentDiv>
      ) : (
        <FilterItemDiv />
      )}
    </>
  )
}
