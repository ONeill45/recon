import styled from '@emotion/styled'
import { useState } from 'react'
import { SearchBarProps } from 'interfaces'

const SearchInput = styled.input`
  width: 100%;
  margin: 1rem 0;
`

const SearchComponentConatainer = styled.div`
  position: relative;
`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SearchBar = ({ setSearchText, searchQuery }: SearchBarProps) => {
  const [searchText, setSearchQuery] = useState<string | undefined>(searchQuery)
  return (
    <SearchComponentConatainer>
      <form>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchQuery(e.currentTarget.value)
          }}
        />
        <button
          type="button"
          onClick={() => {
            setSearchText && searchText && setSearchText(searchText)
          }}
        >
          Search
        </button>
      </form>
    </SearchComponentConatainer>
  )
}
