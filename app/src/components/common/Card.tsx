import React from 'react'
import {
  LinkBox,
  LinkOverlay,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import Link from 'next/link'

export const CardNameDiv = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`

export const CardDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  text-align: left;
`

type cardDescriptionProps = {
  color?: string
}
export const CardDescriptionDiv = styled.div<cardDescriptionProps>`
  font-size: 12px;
  padding: 4px;
  align-items: center;
  text-align: center;
  ${(props) =>
    props.color ? `color: ${props.color}` /* istanbul ignore next */ : ''};
`

export const Card: React.FC<{ link?: string }> = ({ link, children }) => {
  return (
    <LinkBox
      as={Stack}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      direction="column"
      alignItems="center"
      spacing="4"
      padding="4"
      bg={useColorModeValue('white', 'gray.700')}
    >
      {link && (
        <Link href={link} passHref>
          <LinkOverlay />
        </Link>
      )}
      {children}
    </LinkBox>
  )
}
