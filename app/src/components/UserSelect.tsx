import React, { useState, useEffect } from 'react'
import { useMsal } from '@azure/msal-react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { useAccessToken, useMsAccount } from 'utils/hooks'
import { Button } from 'components'
import { callMsGraph, MsGraphEndpoints } from 'utils/functions'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  MenuDivider,
} from '@chakra-ui/react'

const ThumbnailImage = styled.img`
  border-radius: 24px;
  width: 48px;
`

export const UserSelect: React.FC = () => {
  const [thumbnailSrc, setThumbnailSrc] = useState<string>('')
  const router = useRouter()

  const { instance } = useMsal()
  const account = useMsAccount()
  const accessToken = useAccessToken()

  useEffect(() => {
    const getMsAccountThumbnail = async () => {
      if (accessToken) {
        const msGraphResponse = await callMsGraph(
          MsGraphEndpoints.USER_THUMBNAIL,
          accessToken,
          'blob',
        )
        setThumbnailSrc(msGraphResponse)
      }
    }
    getMsAccountThumbnail()
  }, [accessToken])

  const { homeAccountId, name } = account || {}

  const logout = () => {
    if (homeAccountId) {
      const accountKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith(homeAccountId),
      )
      accountKeys.forEach((key) => localStorage.removeItem(key))
      router.reload()
    } else instance.logout()
  }

  return (
    <>
      {thumbnailSrc ? (
        <Menu>
          <MenuButton
            as={Button}
            variant="link"
            data-testid="UserSelectMenuButton"
          >
            <ThumbnailImage src={thumbnailSrc} data-testid="UserSelectAvatar" />
          </MenuButton>
          <MenuList data-testid="UserSelectMenu">
            <Box fontSize="sm" paddingX="3" paddingY="2">
              <strong>Logged in As:</strong> {name}
            </Box>
            <MenuDivider />
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={logout} data-testid="LogOutMenuItem">
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      ) : null}
    </>
  )
}
