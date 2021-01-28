import React, { useState } from 'react'
import {
  Configuration,
  LogLevel,
  PublicClientApplication,
  AuthenticationResult,
  AccountInfo,
  EndSessionRequest,
  RedirectRequest,
  PopupRequest,
} from '@azure/msal-browser'

const AzureActiveDirectoryAppClientId = '8570b3ce-8294-4dba-9048-3f1f9f2eb7ad'

const MSAL_CONFIG: Configuration = {
  auth: {
    authority:
      'https://login.microsoftonline.com/7f7697bc-3ee2-48f2-9d35-7cb75bddd74b',
    clientId: AzureActiveDirectoryAppClientId,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
        }
      },
    },
  },
}

class AzureAuthenticationContext {
  private myMSALObj: PublicClientApplication = new PublicClientApplication(
    MSAL_CONFIG,
  )
  private account?: AccountInfo
  private loginRedirectRequest?: RedirectRequest
  private loginRequest?: PopupRequest

  public isAuthenticationConfigured = false

  constructor() {
    // @ts-ignore
    this.account = null
    this.setRequestObjects()
    if (MSAL_CONFIG?.auth?.clientId) {
      this.isAuthenticationConfigured = true
    }
  }

  private setRequestObjects(): void {
    this.loginRequest = {
      scopes: [],
      prompt: 'select_account',
    }

    this.loginRedirectRequest = {
      ...this.loginRequest,
      redirectStartPage: 'http://localhost:3000', //window.location.href,
    }
  }

  login(signInType: string, setUser: any): void {
    if (signInType === 'loginPopup') {
      this.myMSALObj
        .loginPopup(this.loginRequest)
        .then((resp: AuthenticationResult) => {
          this.handleResponse(resp, setUser)
        })
        .catch((err) => {
          console.error(err)
        })
    } else if (signInType === 'loginRedirect') {
      this.myMSALObj.loginRedirect(this.loginRedirectRequest)
    }
  }

  logout(account: AccountInfo): void {
    const logOutRequest: EndSessionRequest = {
      account,
    }

    this.myMSALObj.logout(logOutRequest)
  }
  handleResponse(response: AuthenticationResult, incomingFunction: any) {
    if (response !== null) {
      // @ts-ignore
      this.account = response.account
    } else {
      this.account = this.getAccount()
    }

    if (this.account) {
      incomingFunction(this.account)
    }
  }
  // @ts-ignore
  private getAccount(): AccountInfo | undefined {
    console.log('loadAuthModule')
    const currentAccounts = this.myMSALObj.getAllAccounts()
    if (currentAccounts === null) {
      // @ts-ignore
      console.log('No accounts detected')
      return undefined
    }

    if (currentAccounts.length > 1) {
      // TBD: Add choose account code here
      // @ts-ignore
      console.log(
        'Multiple accounts detected, need to add choose account code.',
      )
      return currentAccounts[0]
    } else if (currentAccounts.length === 1) {
      return currentAccounts[0]
    }
  }
}

const ua = '' // window?.navigator?.userAgent
const msie = ua.indexOf('MSIE ')
const msie11 = ua.indexOf('Trident/')
const isIE = msie > 0 || msie11 > 0

// Log In, Log Out button
const AzureAuthenticationButton = ({ onAuthenticated }: any): JSX.Element => {
  // Azure client context
  const authenticationModule: AzureAuthenticationContext = new AzureAuthenticationContext()

  const [authenticated, setAuthenticated] = useState<Boolean>(false)
  const [user, setUser] = useState<AccountInfo>()

  const logIn = (method: string): any => {
    const typeName = 'loginPopup'
    const logInType = isIE ? 'loginRedirect' : typeName

    // Azure Login
    authenticationModule.login(logInType, returnedAccountInfo)
  }
  const logOut = (): any => {
    if (user) {
      // onAuthenticated(undefined)
      // Azure Logout
      authenticationModule.logout(user)
    }
  }

  const returnedAccountInfo = (user: AccountInfo) => {
    // set state
    setAuthenticated(user?.name ? true : false)
    // TODO: why is onAuthenticated not a function?
    // onAuthenticated(user)
    console.log(user)
    setUser(user)
  }

  const showLogInButton = (): any => {
    return (
      <button id="authenticationButton" onClick={() => logIn('loginPopup')}>
        Log in
      </button>
    )
  }

  const showLogOutButton = (): any => {
    return (
      <div id="authenticationButtonDiv">
        <div id="authentication">
          <button id="authenticationButton" onClick={() => logOut()}>
            Log out
          </button>
        </div>
      </div>
    )
  }

  const showButton = (): any => {
    return authenticated ? showLogOutButton() : showLogInButton()
  }

  return (
    <div id="authentication">
      {authenticationModule.isAuthenticationConfigured ? (
        showButton()
      ) : (
        <div>Authentication Client ID is not configured.</div>
      )}
    </div>
  )
}

export default AzureAuthenticationButton
