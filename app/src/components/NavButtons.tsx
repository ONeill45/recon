import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { NavButton } from 'components'
import { DisplayType } from 'interfaces'
import { AuthenticatedTemplate } from '@azure/msal-react'

type navButtonProps = {
  buttonProperties: { title: string; route: string }[]
  displayType: DisplayType
  onClick?: Function
}

type navButtonDivProps = {
  displayType: DisplayType
}

const direction = ({ displayType }: navButtonDivProps) => {
  switch (displayType) {
    case DisplayType.COLUMN:
      return css`
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
      `
    case DisplayType.ROW:
      return css`
        flex-direction: row;
        padding-left: 20px;
      `
    default:
      return ''
  }
}

const NavButtonsDiv = styled.div<navButtonDivProps>`
  display: flex;
  justify-content: flex-start;
  ${direction}
`

export const NavButtons = ({
  buttonProperties,
  displayType,
}: navButtonProps) => (
  <AuthenticatedTemplate>
    <NavButtonsDiv displayType={displayType}>
      {buttonProperties.map((buttonProperty) => (
        <NavButton
          key={buttonProperty.title}
          title={buttonProperty.title}
          route={buttonProperty.route}
          displayType={displayType}
        />
      ))}
    </NavButtonsDiv>
  </AuthenticatedTemplate>
)
