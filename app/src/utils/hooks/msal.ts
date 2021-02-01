import { useEffect, useState } from 'react'
import { useMsal, useAccount } from '@azure/msal-react'
import { AccountInfo, IPublicClientApplication } from '@azure/msal-browser'

export const useMsAccount = () => {
  const { accounts } = useMsal()
  return useAccount(accounts[0] || {})
}

const getAccessToken = async (
  instance: IPublicClientApplication,
  account: AccountInfo,
) => {
  const response = await instance.acquireTokenSilent({
    scopes: ['User.Read'],
    account: account,
  })
  return response.accessToken
}

export const useAccessToken = () => {
  const { instance } = useMsal()
  const account = useMsAccount()
  const [accessToken, setAccessToken] = useState<string | undefined>()

  useEffect(() => {
    let isMounted = true
    // need expires at?
    if (account && !accessToken) {
      getAccessToken(instance, account).then((token) => {
        if (!isMounted) return
        console.log('getting token')
        console.log(token)
        setAccessToken(token)
      })
    }
    return () => {
      isMounted = false
    }
  }, [account])

  return accessToken
}
