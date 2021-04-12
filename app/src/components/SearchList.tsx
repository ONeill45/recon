import styled from '@emotion/styled'
import { Resource } from 'interfaces'
import { useRouter } from 'next/router'

const ResultsList = styled.ul`
  display: block;
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const ResultsListItem = styled.li`
  width: 100%;
  background-color: #ffe3b8;
  padding: 0.6rem;
  border: 1px solid #ffd087;

  &:hover {
    background-color: #ffd087;
    cursor: pointer;
  }
`

const ResourceTitle = styled.div`
  font-size: 0.8rem;
`

type SearchListProps = {
  results?: any
}

export const SearchList = ({ results }: SearchListProps) => {
  const router = useRouter()

  const listItemClick = (id: any) => {
    router.push({ pathname: '/resources/[id]', query: { id } })
  }

  return (
    <ResultsList>
      {
        results && results.map((result: Resource) => (
          <ResultsListItem key={result.id} onClick={() => listItemClick(result.id)}>
            {result.preferredName || result.firstName} {result.lastName}
            <ResourceTitle>
              {result.title}
            </ResourceTitle>
          </ResultsListItem>
        ))
      }
    </ResultsList>
  )
}
