import React from 'react'
import { Heading, Flex, Stack } from '@chakra-ui/react'

type PageHeaderProps = {
  headerText: string
}
export const PageHeader: React.FC<PageHeaderProps> = ({
  headerText,
  children,
}) => {
  return (
    <Flex justifyContent="space-between" marginBottom="5" alignItems="center">
      <Heading as="h1" size="xl" isTruncated>
        {headerText}
      </Heading>
      <Stack spacing="4" alignItems="center" direction="row">
        {children}
      </Stack>
    </Flex>
  )
}
