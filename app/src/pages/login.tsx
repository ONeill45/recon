import React, { useEffect } from 'react'
import { useAuthContext } from 'src/utils/context'
import { useRouter } from 'next/router'

import AzureAuthenticationButton from '../components/AzureAuthenticationButton'
// import {
//   AzureAD,
//   AuthenticationState,
//   IAzureADFunctionProps,
//   LoginType,
//   MsalAuthProvider,
// } from 'react-aad-msal'
// import { LogLevel, Logger } from 'msal'

// const logger = new Logger(
//   (logLevel, message, containsPii) => {
//     console.log('[MSAL]', message)
//   },
//   {
//     level: LogLevel.Verbose,
//     piiLoggingEnabled: false,
//   },
// )

// const authProvider = new MsalAuthProvider(
//   {
//     auth: {
//       authority:
//         'https://login.microsoftonline.com/7f7697bc-3ee2-48f2-9d35-7cb75bddd74b',
//       clientId: '8570b3ce-8294-4dba-9048-3f1f9f2eb7ad',
//       postLogoutRedirectUri: 'http://localhost:3000/login', //window.location.origin,
//       redirectUri: 'http://localhost:3000', // window.location.origin,
//       validateAuthority: true,

//       // After being redirected to the "redirectUri" page, should user
//       // be redirected back to the Url where their login originated from?
//       navigateToLoginRequestUrl: false,
//     },
//     // Enable logging of MSAL events for easier troubleshooting.
//     // This should be disabled in production builds.
//     system: {
//       logger: logger as any,
//     },
//     cache: {
//       cacheLocation: 'sessionStorage',
//       storeAuthStateInCookie: false,
//     },
//   },
//   {
//     scopes: ['openid'],
//   },
//   {
//     loginType: LoginType.Popup,
//     // When a token is refreshed it will be done by loading a page in an iframe.
//     // Rather than reloading the same page, we can point to an empty html file which will prevent
//     // site resources from being loaded twice.
//     tokenRefreshUri: 'http://localhost:3000/auth.html', // window.location.origin + '/auth.html',
//   },
// )

const Login = () => {
  // @ts-ignore
  const { user, setUser } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  // const login = async () => {
  //   // TODO: implement real logic
  //   const newToken = await Promise.resolve('test')
  //   setUser(newToken)
  //   localStorage.setItem('user', newToken)
  // }

  return (
    // <AzureAD provider={authProvider}>
    //   {
    //     // @ts-ignore
    //     ({ login, logout, authenticationState }: IAzureADFunctionProps) => {
    //       const isInProgress =
    //         authenticationState === AuthenticationState.InProgress
    //       const isAuthenticated =
    //         authenticationState === AuthenticationState.Authenticated
    //       const isUnauthenticated =
    //         authenticationState === AuthenticationState.Unauthenticated

    //       if (isAuthenticated) {
    //         return (
    //           <>
    //             <p>You're logged in!</p>
    //             <button onClick={logout} className="Button">
    //               Logout
    //             </button>
    //             {/* <GetAccessTokenButton provider={authProvider} />
    //             <GetIdTokenButton provider={authProvider} /> */}
    //           </>
    //         )
    //       } else if (isUnauthenticated || isInProgress) {
    //         return (
    //           <button
    //             className="Button"
    //             onClick={login}
    //             disabled={isInProgress}
    //           >
    //             Login
    //           </button>
    //         )
    //       }
    //     }
    //   }
    // </AzureAD>
    <AzureAuthenticationButton />
  )
}

export default Login
