import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react'

import { chakraTheme } from '../styles/theme'

const toast = createStandaloneToast({ theme: chakraTheme })

export const displayToast = ({
  title = 'You need a title',
  status = 'success',
  isClosable = true,
  description,
  duration = 5000,
  position = 'top',
  ...configRemainder
}: UseToastOptions): string | number | undefined => {
  return toast({
    title,
    status,
    description,
    duration,
    isClosable,
    position,
    ...configRemainder,
  })
}
