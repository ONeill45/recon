import styled from '@emotion/styled'
import { FormEvent } from 'react'
import { SearchBarProps } from 'interfaces'
import { Input } from '@chakra-ui/input'

const SearchInput = styled.input`
  width: 100%;
  margin: 1rem 0;
`

const SearchComponentConatainer = styled.div`
  position: relative;
`

export const SearchBar = ({ setSearchText }: SearchBarProps) => {
  const updateText = (val: string) => {
    if (setSearchText) {
      setSearchText(val)
    } else {
      return
    }
  }

  return (
    <SearchComponentConatainer>
      <form>
        <Input
          type="text"
          placeholder="Search..."
          onChange={(e: FormEvent<HTMLInputElement>) =>
            updateText(e.currentTarget.value)
          }
        />
      </form>
    </SearchComponentConatainer>
  )
}
