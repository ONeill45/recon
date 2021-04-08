import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useEffect, useState, FormEvent } from 'react'
import { SearchList } from 'components'

const isDisplayed = ({ display }: displayProps) => css`
  display: ${display ? 'block' : 'none'};
`

const SearchInput = styled.input`
  width: 72%;
  margin: 1rem 0;
`

const SearchComponentConatainer = styled.div`
  position: relative;
`

const ResultsListContainer = styled.div<displayProps>`
  ${isDisplayed};
  position: absolute;
  top: 2.4rem;
  width: 100%;
`

type displayProps = {
  display: boolean
}

type SearchBarProps = {
  setSearchText?: any
  searchQuery?: any
}

export const SearchBar = ({ setSearchText, searchQuery }: SearchBarProps) => {
  const [inputText, setInputText] = useState('')
  const [displayResults, setDisplayResults] = useState(false)
  const [searchResults, setSearchResults] = useState<[]>()

  useEffect(() => {
    if (setSearchText) {
      if (inputText === '') {
        setSearchResults([])
      } else {
        if (searchQuery && searchQuery.data) {
          setSearchResults(searchQuery.data.searchResource)
        }
      }
  
      if (searchResults && searchResults.length > 0) {
        setDisplayResults(true)
      } else {
        setDisplayResults(false)
      }
    }

  }, [searchQuery])

  useEffect(() => {
    if (setSearchText) {
      const handler = setTimeout(() => {
        setSearchText(inputText);
      }, 500);
  
      return () => {
        clearTimeout(handler);
      };
    }
  }, [inputText])

  return (
    <SearchComponentConatainer>
      <form>
        <SearchInput type="text" placeholder="Search..." onChange={(e: FormEvent<HTMLInputElement>) => setInputText(e.currentTarget.value)} />
        <button type="submit">Search</button>
      </form>
      <ResultsListContainer display={displayResults}>
        <SearchList results={searchResults}/>
      </ResultsListContainer>
    </SearchComponentConatainer>
  )
}
