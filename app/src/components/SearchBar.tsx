import styled from '@emotion/styled'
import { useState } from 'react'

const SearchInput = styled.input`
  width: 72%;
  margin: 1rem 0;
`

type SearchBarProps = {
  setSearchText?: (s: string) => void
  searchQuery?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SearchBar = ({ setSearchText, searchQuery }: SearchBarProps) => {
  const [searchText, setSearchQuery] = useState<string | undefined>(searchQuery)
  return (
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
  )
}
