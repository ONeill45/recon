import React, { useRef, useState } from 'react'
import { SideNavDiv } from './'
import { useMsal } from '@azure/msal-react'

import { useClickOutside } from '../utils/hooks'

const UserSelect = () => {
  const [show, setShow] = useState(false)
  const { accounts, instance } = useMsal()

  const selectRef = useRef(null)
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
      <div id={buttonId} onClick={toggleShow}>
        Hi {firstName}
      </div>
      <SideNavDiv displayed={show} ref={selectRef}>
        <ul>
          <button onClick={logout}>Log Out</button>
        </ul>
      </SideNavDiv>
    </>
  )
}

export default UserSelect
