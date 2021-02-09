import React, { useRef, useState, useEffect } from 'react'
import { useMsal } from '@azure/msal-react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { useAccessToken, useClickOutside, useMsAccount } from 'utils/hooks'
import { Button, SideNavDiv } from 'components'
import { callMsGraph, MsGraphEndpoints } from 'utils/functions'

const UserSelectDiv = styled.div({
  cursor: 'pointer',
  fontWeight: 'bold',
  paddingRight: '10px',
  display: 'flex',
  alignItems: 'center',
})

const GreetingDiv = styled.div`
  padding-right: 10px;
`

const NoBulletUl = styled.ul({
  listStyle: 'none',
})

const ThumbnailImage = styled.img`
  border-radius: 24px;
  width: 48px;
`

export const UserSelect = () => {
  const [show, setShow] = useState(false)
  const [thumbnailSrc, setThumbnailSrc] = useState<string>('')
  const selectRef = useRef(null)
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

  const divId = 'userSelectButton',
    greetingId = 'userSelectGreeting',
    imageId = 'userSelectImage'
  useClickOutside(selectRef, () => setShow(false), [divId, greetingId, imageId])
  const toggleShow = () => {
    setShow(!show)
  }

  const { homeAccountId, name } = account || {}
  const greeting = `Hi ${name?.split(' ')[0]}`

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
        <UserSelectDiv id={divId} onClick={toggleShow}>
          <GreetingDiv id={greetingId}>{greeting}</GreetingDiv>
          <ThumbnailImage id={imageId} src={thumbnailSrc} />
        </UserSelectDiv>
      ) : null}

      <SideNavDiv
        data-testid="UserSelectMenu"
        displayed={show}
        ref={selectRef}
        direction="right"
      >
        <NoBulletUl>
          <li>
            <Button onClick={logout}>Log Out</Button>
          </li>
        </NoBulletUl>
      </SideNavDiv>
    </>
  )
}
