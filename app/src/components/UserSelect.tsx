import React, { useRef, useState, useEffect } from 'react'
import { useMsal, useAccount } from '@azure/msal-react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useClickOutside } from '../utils/hooks'
import { SideNavDiv } from './'
import { Button } from './Button'

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me/photos/48x48/$value',
}

const callMsGraph = async (accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'image/jpeg',
  }
  const options = {
    method: 'GET',
    headers: headers,
  }
  const response = await fetch(graphConfig.graphMeEndpoint, options)
  const blob = await response.blob()
  return URL.createObjectURL(blob)
}

const UserSelectDiv = styled.div({
  cursor: 'pointer',
  fontWeight: 'bold',
  paddingRight: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '150px',
})

const NoBulletUl = styled.ul({
  listStyle: 'none',
})

const UserSelect = () => {
  const [show, setShow] = useState(false)
  const [thumbnailSrc, setThumbnailSrc] = useState<string>('')
  const selectRef = useRef(null)

  const { accounts, instance } = useMsal()
  const account = useAccount(accounts[0] || {})

  useEffect(async () => {
    const tokenResponse = await instance.acquireTokenSilent({
      scopes: ['User.Read'],
      // @ts-ignore
      account: account,
    })
    const msGraphResponse = await callMsGraph(tokenResponse.accessToken)
    console.log(msGraphResponse)
    setThumbnailSrc(msGraphResponse || '')
  }, [instance])

  const buttonId = 'userSelectButton'
  useClickOutside(selectRef, () => setShow(false), [buttonId])
  const toggleShow = () => {
    setShow(!show)
  }
  // @ts-ignore
  const { homeAccountId, name } = accounts[0]
  const firstName = name?.split(' ')[0]
  const logout = () => {
    if (homeAccountId) {
      const accountKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith(homeAccountId),
      )
      accountKeys.forEach((key) => localStorage.removeItem(key))
      location.reload()
    } else instance.logout()
  }
  return (
    <>
      <UserSelectDiv id={buttonId} onClick={toggleShow}>
        <div>Hi {firstName}</div>
        <img src={thumbnailSrc} />
      </UserSelectDiv>

      <SideNavDiv displayed={show} ref={selectRef} direction="right">
        <NoBulletUl>
          <li>
            <Button onClick={logout}>Log Out</Button>
          </li>
        </NoBulletUl>
      </SideNavDiv>
    </>
  )
}
export default UserSelect
