import styled from '@emotion/styled'
import { useEffect, useState, FormEvent } from 'react'
import { SearchBarProps } from 'interfaces'

const SearchInput = styled.input`
  width: 100%;
  margin: 1rem 0;
`

const SearchComponentConatainer = styled.div`
  position: relative;
`

let timer: NodeJS.Timeout

export const SearchBar = ({ setSearchText, searchQuery }: SearchBarProps) => {
  const [searchText, setSearchQuery] = useState<string>(searchQuery || '')

  useEffect(() => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      setSearchText && setSearchText(searchText)
    }, 1000)
  }, [searchText])

  return (
    <SearchComponentConatainer>
      <form>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            setSearchQuery(e.currentTarget.value)
          }}
        />
      </form>
    </SearchComponentConatainer>
  )
}
