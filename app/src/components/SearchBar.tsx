import styled from '@emotion/styled'
import { FormEvent } from 'react'

const SearchInput = styled.input`
  width: 72%;
  margin: 1rem 0;
`

type SearchBarProps = {
  setSearchText?: any
  searchQuery?: any
}

export const SearchBar = ({ setSearchText, searchQuery }: SearchBarProps) => {
  console.log('SEARCH RESULTS: ', searchQuery)

  return (
    <form>
      <SearchInput
        type="text"
        placeholder="Search..."
        onChange={(e: FormEvent<HTMLInputElement>) =>
          setSearchText(e.currentTarget.value)
        }
      />
      <button type="submit">Search</button>
    </form>
  )
}
