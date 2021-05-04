import styled from '@emotion/styled'
import { FormEvent } from 'react'

const SearchInput = styled.input`
  width: 72%;
  margin: 1rem 0;
`

const SearchComponentConatainer = styled.div`
  position: relative;
`

type SearchBarProps = {
  setSearchText?: any
}

export const SearchBar = ({ setSearchText }: SearchBarProps) => {

  return (
    <SearchComponentConatainer>
      <form>
        <SearchInput type="text" placeholder="Search..." onChange={(e: FormEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value)} />
        <button type="submit">Search</button>
      </form>
    </SearchComponentConatainer>
  )
}
