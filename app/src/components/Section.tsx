import styled from '@emotion/styled'

export const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 50%;
`

export const Section = styled.div`
  margin: 0 0 2rem 2rem;
`

export const SectionTitle = styled.div`
  padding: 0.5rem 0;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`

export const SectionTable = styled.table`
  width: 100%;
  font-size: 1rem;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  line-height: 1.2;
  border: none;
  border-collapse: collapse;
`

export const SectionTableHeaderRow = styled.tr`
  background: #ffe3b8;
`

export const SectionTableHeaderData = styled.th`
  font-weight: bold;
  border: none;
  padding: 0.5rem;

  &:first-of-type {
    border-radius: 1rem 0 0 1rem;
  }

  &:last-of-type {
    border-radius: 0 1rem 1rem 0;
  }
`

export const SectionTableData = styled.td`
  border: none;
  padding-left: 1rem;
  padding: 0.5rem 0;
`

export const SectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fff;
  height: 3rem;
  width: 100%;
  padding: 0 1rem;
`

export const SectionRowItem = styled.div`
  font-size: 1rem;
  font-weight: normal;
  text-align: left;
  vertical-align: middle;
  line-height: 3;
`

export const SectionRowHeader = styled(SectionRow)`
  background: #f7f7f7;
`

export const SectionRowHeaderItem = styled(SectionRowItem)`
  font-weight: bold;
`
