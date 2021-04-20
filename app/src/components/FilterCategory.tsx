import styled from '@emotion/styled'
import { useState } from 'react'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'

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
  line-height: 20px;
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

type filterCategoryProps = {
  title: string
  fields?: any
  filterItems?: any
  onChange?: any
}

export const FilterCategory = ({
  title,
  fields,
  onChange,
}: filterCategoryProps) => {
  const [expanded, setExpanded] = useState(false)
  const queryData: { [key: string]: any } = {}

  const handleOnChange = (value: string, field: string) => {
    queryData[field] = value
  }

  const renderFilterItem = (item: {
    field: string
    type: string
    label: string
  }) => {
    return (
      <FilterItemDiv>
        <FilterItemLabel htmlFor={`${item.type}-${item.field}`}>
          {item.label}
        </FilterItemLabel>
        <FilterItemInput
          type={item.type}
          id={`${item.type}-${item.field}`}
          onChange={(e: any) => handleOnChange(e.target?.value, item.field)}
        />
      </FilterItemDiv>
    )
  }

  const onFilter = () => {
    onChange(queryData)
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
            </>
          )}
          <FilterSubmitDIv>
            <FilterSubmitButton type="button" onClick={onFilter}>
              Search
            </FilterSubmitButton>
          </FilterSubmitDIv>
          {/* this is just an example and will be removed/replaced later */}
        </FilterCategoryContentDiv>
      ) : (
        <div />
      )}
    </>
  )
}
