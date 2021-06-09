import React from 'react'
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Link as ChakraLink,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import Link from 'next/link'

type ButtonProps = {
  colorScheme?: 'primary' | 'secondary'
  ref?: any
} & ChakraButtonProps

type LinkButtonProps = {
  href: string
} & ButtonProps

export const Button: React.FC<ButtonProps> = React.forwardRef(
  ({ colorScheme = 'primary', variant = 'solid', ...rest }, ref: any) => {
    return (
      <ChakraButton
        {...rest}
        colorScheme={colorScheme}
        variant={variant}
        ref={ref}
      />
    )
  },
)

const StyledLinkButton = styled(Button)`
  &:hover {
    text-decoration: none;
  }
`

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  ...propsRemainder
}) => {
  return (
    <Link href={href} passHref>
      <StyledLinkButton as={ChakraLink} {...propsRemainder} />
    </Link>
  )
}
