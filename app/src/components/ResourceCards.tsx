import styled from '@emotion/styled'
import { Resource } from 'interfaces'
import { ResourceCard } from './ResourceCard'

type ResourceCardsProps = {
  resources: Resource[]
}

const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
export const ResourceCards = ({ resources }: ResourceCardsProps) => (
  <CardsDiv>
    {resources.map((resource) => {
      return <ResourceCard key={resource.id} resource={resource} />
    })}
  </CardsDiv>
)
