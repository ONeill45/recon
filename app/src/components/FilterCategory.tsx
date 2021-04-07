import styled from '@emotion/styled'
import React, { useState } from 'react'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'

type filterCategoryProps = {
  title: string,
  fields: Array<{[key: string]: any}>,
  onChange: (queryData: {[key: string]: string}) => void;
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
  font-size: 13px;
`

export const FilterItemInput = styled.input``

export const FilterSubmitButton = styled.button`
  width: 100px
`

export const FilterCategory = ({ title, fields, onChange }: filterCategoryProps) => {
  const [expanded, setExpanded] = useState(false)
  const queryData: {[key: string]: any} = {}
  const handleOnChange = (e: Event, field: string) => {
    queryData[field] = e?.target?.value
  }
  const onFilter= () => {
    onChange(queryData)
  }
  return (
    <>
      <FilterCategoryHeaderDiv onClick={() => setExpanded(!expanded)}>
        {expanded ? <AiOutlineDown /> : <AiOutlineRight />} {title}
      </FilterCategoryHeaderDiv>

      {(expanded) ? (
        <FilterCategoryContentDiv data-testid="FilterCategoryContent">
          {
            (fields) ? 
            fields.map((item: { field: string, type: string, label: string}) => (
              <FilterItemDiv>
                <FilterItemLabel htmlFor={`${item.type}-${item.field}`}>{item.label}</FilterItemLabel>
                <FilterItemInput type={item.type} id={`${item.type}-${item.field}`} onChange={(e) => handleOnChange(e, item.field)}/>
              </FilterItemDiv>
            )) : 
            <>
              <FilterItemDiv>
                <FilterItemLabel htmlFor="checkbox1">Relevant filter option 1</FilterItemLabel>
                <FilterItemInput type="checkbox" id="checkbox1" />
              </FilterItemDiv>
              <FilterItemDiv>
                <FilterItemLabel htmlFor="checkbox2">Relevant filter option 2</FilterItemLabel>
                <FilterItemInput type="checkbox" id="checkbox2" />
              </FilterItemDiv>
              <FilterItemDiv>
                <FilterItemLabel htmlFor="checkbox3">Relevant filter option 3</FilterItemLabel>
                <FilterItemInput type="checkbox" id="checkbox3" />
              </FilterItemDiv>
              <FilterItemDiv>
                <FilterItemLabel htmlFor="checkbox4">Relevant filter option 4</FilterItemLabel>
                <FilterItemInput type="checkbox" id="checkbox4" />
              </FilterItemDiv>
            </>
          }
          <FilterSubmitDIv>
            <FilterSubmitButton type="button" onClick={onFilter}>Filter</FilterSubmitButton>
          </FilterSubmitDIv>
        </FilterCategoryContentDiv>
      ) : (
        <FilterItemDiv/>
      )}

    </>
  )
}
