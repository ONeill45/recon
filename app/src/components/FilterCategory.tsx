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
            fields.map((item: { field: string, type: string}) => (
              <div>
                <label htmlFor={`${item.type}-${item.field}`}>{item.field}</label>
                <input type={item.type} id={`${item.type}-${item.field}`} onChange={(e) => handleOnChange(e, item.field)}/>
              </div>
            )) : 
            <>
              <div>
                <label htmlFor="checkbox1">Relevant filter option 1</label>
                <input type="checkbox" id="checkbox1" />
              </div>
              <div>
                <label htmlFor="checkbox2">Relevant filter option 2</label>
                <input type="checkbox" id="checkbox2" />
              </div>
              <div>
                <label htmlFor="checkbox3">Relevant filter option 3</label>
                <input type="checkbox" id="checkbox3" />
              </div>
              <div>
                <label htmlFor="checkbox4">Relevant filter option 4</label>
                <input type="checkbox" id="checkbox4" />
              </div>
            </>
          }
          <button type="button" onClick={onFilter}>Filter</button>
        </FilterCategoryContentDiv>
      ) : (
        <div/>
      )}

    </>
  )
}
