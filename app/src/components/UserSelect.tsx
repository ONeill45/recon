import React, { useState } from 'react'
import { SideNavDiv } from './'
import { useMsal } from '@azure/msal-react'

const UserSelect = () => {
  const [show, setShow] = useState(false)
  const { accounts, instance } = useMsal()

  const user = accounts[0]?.name.split(' ')[0]

  const logout = () => {
    instance.logout()
  }
  return (
    <>
      <div onClick={() => setShow(true)}>Hello {user}</div>
      <SideNavDiv displayed={show}>
        <ul>
          <button onClick={logout}>Log Out</button>
        </ul>
      </SideNavDiv>
    </>
  )
}

export default UserSelect
