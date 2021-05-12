import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'

type filterCategoryProps = {
  title: string
  fields: Array<{ [key: string]: any }> | undefined
  filterItems: { [key: string]: any } | undefined
  onChange?: (queryData: { [key: string]: string }) => void
}

type filterItemDivProps = {
  isDate?: boolean
}

type filterInputProps = {
  isDate?: boolean
}

type filterDateDescriptionProps = {
  isDate?: boolean
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

export const FilterItemDiv = styled.div<filterItemDivProps>`
  display: flex;
  flex-direction: ${(props: any) => (props.isDate ? 'column' : 'row')};
  justify-content: space-between;
  margin: ${(props: any) =>
    props.isDate ? '1.5rem 0.3rem 0 0.3rem' : '0.3rem 0.3rem 0 0.3rem'};
`

export const FilterSubmitDIv = styled.div`
  margin: 5px;
  text-align: center;
`

export const FilterItemLabel = styled.label`
  font-size: 15px;
`

export const FilterItemInput = styled.input<filterInputProps>`
  width: ${(props: any) => (props.isDate ? '50%' : 'auto')};
`

export const FilterDateDescription = styled.div<filterDateDescriptionProps>`
  display: ${(props: any) => (props.isDate ? 'block' : 'none')};
  margin: 0.5rem 0;
  font-size: 0.8rem;
`

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
  const [qData, setQData] = useState<{ [key: string]: any }>({})

  const handleOnChangeCheckBox = ({
    target,
    field,
    name,
  }: {
    [key: string]: any
  }) => {
    if (target && target.checked === true) {
      if (!qData[field]) {
        const qDataCopy = { ...qData }
        qDataCopy[field] = [name]
        setQData({ ...qDataCopy })
      } else {
        const qDataCopy = { ...qData }
        qDataCopy[field].push(name)
        setQData({ ...qDataCopy })
      }
    } else {
      let qDataCopy = { ...qData }
      const filteredCopy = qDataCopy[field].filter((item: any) => item !== name)
      if (filteredCopy.length > 0) {
        qDataCopy[field] = [...filteredCopy]
      } else {
        delete qDataCopy[field]
      }
      setQData({ ...qDataCopy })
    }
  }

  const handleOnChange = (value: string, field: string, date?: boolean) => {
    if (date) {
      if (value) {
        if (field === 'startDate') {
          const qDataCopy = { startDate: {} }
          qDataCopy['startDate'] = {
            date: value,
            beforeAfter: beforeAfterStartDate,
          }
          setQData((prev: any) => ({
            ...prev,
            ...qDataCopy,
          }))
        } else {
          const qDataCopy = { endDate: {} }
          qDataCopy['endDate'] = {
            date: value,
            beforeAfter: beforeAfterEndDate,
          }
          setQData((prev: any) => ({
            ...prev,
            ...qDataCopy,
          }))
        }
      } else {
        const qDataCopy = { ...qData }
        delete qDataCopy[field]
        setQData({ ...qDataCopy })
      }
    } else {
      const qDataCopy = { ...qData }
      qDataCopy[field] = [value]
      setQData({ ...qDataCopy })
    }
  }

  const [clients, setClients] = useState<Array<string>>([])
  const [projects, setProjects] = useState<Array<string>>([])
  const [departments, setDepartments] = useState<Array<string>>([])
  const [titles, setTitles] = useState<Array<string>>([])
  const [skills, setSkills] = useState<Array<string>>([])

  const [clientNames, setClientNames] = useState<Array<string>>([])
  const [projectConfidence, setProjectConfidence] = useState<Array<string>>([])
  const [projectPriorities, setProjectPriorities] = useState<Array<string>>([])
  const [projectTypes, setProjectTypes] = useState<Array<string>>([])
  const [beforeAfterStartDate, setBeforeAfterStartDate] = useState<string>('')
  const [beforeAfterEndDate, setBeforeAfterEndDate] = useState<string>('')

  useEffect(() => {
    if (filterItems && filterItems.clients) {
      setClients(filterItems.clients)
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

    if (filterItems && filterItems.clientNames) {
      setClientNames(filterItems.clientNames)
    }
    if (filterItems && filterItems.projectConfidence) {
      setProjectConfidence(filterItems.projectConfidence)
    }
    if (filterItems && filterItems.projectPriorities) {
      setProjectPriorities(filterItems.projectPriorities)
    }
    if (filterItems && filterItems.projectTypes) {
      setProjectTypes(filterItems.projectTypes)
    }
  }, [filterItems])

  const onFilter = () => {
    if (onChange) {
      onChange(qData)
    }
  }

  useEffect(() => {
    const qDataCopy = { ...qData }
    let qDataCopyStartDate = { ...qDataCopy['startDate'] }
    if (qDataCopyStartDate.date) {
      qDataCopy['startDate'] = {
        ...qDataCopyStartDate,
        beforeAfter: beforeAfterStartDate,
      }
      setQData({ ...qDataCopy })
    }
  }, [beforeAfterStartDate])

  useEffect(() => {
    const qDataCopy = { ...qData }
    let qDataCopyEndDate = { ...qDataCopy['endDate'] }
    if (qDataCopyEndDate.date) {
      qDataCopy['endDate'] = {
        ...qDataCopyEndDate,
        beforeAfter: beforeAfterEndDate,
      }
      setQData({ ...qDataCopy })
    }
  }, [beforeAfterEndDate])

  const beforeAfterChange = (
    checked: any,
    field: string,
    beforeAfter: string,
  ) => {
    if (field === 'startDate') {
      if (checked) {
        if (beforeAfter === 'before') {
          setBeforeAfterStartDate('before')
        } else {
          setBeforeAfterStartDate('after')
        }
      } else {
        setBeforeAfterStartDate('present')
      }
    }
    if (field === 'endDate') {
      if (checked) {
        if (beforeAfter === 'before') {
          setBeforeAfterEndDate('before')
        } else {
          setBeforeAfterEndDate('after')
        }
      } else {
        setBeforeAfterEndDate('present')
      }
    }
  }

  const selectRenderItems = (field: string): Array<string> | null => {
    if (field === 'project') return projects
    if (field === 'clients') return clients
    if (field === 'departmentName') return departments
    if (field === 'title') return titles
    if (field === 'skills') return skills

    if (field === 'clientNames') return clientNames
    if (field === 'confidence') return projectConfidence
    if (field === 'priorities') return projectPriorities
    if (field === 'projectTypes') return projectTypes
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
              items.map((name: string, i: number) => (
                <FilterCheckItemDiv key={i}>
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
      <FilterItemDiv isDate={item.type === 'date'}>
        <FilterItemLabel htmlFor={`${item.type}-${item.field}`}>
          {item.label}
        </FilterItemLabel>
        <FilterDateDescription isDate={item.type === 'date'}>
          Check box below to filter before or after the selected date
          <FilterCheckItemDiv>
            <FilterItemInput
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                beforeAfterChange(e.target?.checked, item.field, 'before')
              }
            />
            <FilterItemLabel>before</FilterItemLabel>
          </FilterCheckItemDiv>
          <FilterCheckItemDiv>
            <FilterItemInput
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                beforeAfterChange(e.target?.checked, item.field, 'after')
              }
            />
            <FilterItemLabel>after</FilterItemLabel>
          </FilterCheckItemDiv>
        </FilterDateDescription>
        <FilterItemInput
          type={item.type}
          id={`${item.type}-${item.field}`}
          isDate={item.type === 'date'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e.target?.value, item.field, item.type === 'date')
          }
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
            fields.map(
              (item: { field: string; type: string; label: string }) => (
                <div key={item.label}>{renderFilterItem(item)}</div>
              ),
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
