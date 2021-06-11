import React, { FC } from 'react'
import { SimpleGrid } from '@chakra-ui/layout'

export const CardsContainer: FC = ({ children }) => (
  <SimpleGrid spacing="4" columns={{ sm: 1, md: 2, lg: 3 }} width="100%">
    {children}
  </SimpleGrid>
)
