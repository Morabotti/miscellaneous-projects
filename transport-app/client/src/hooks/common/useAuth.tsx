import React, { useState, createContext, ReactNode, useContext, useMemo, useCallback } from 'react'
import { useInitialContext } from '@hooks'
import { AuthUser, LocalStorageKeys } from '@types'
import { useHistory, useLocation } from 'react-router'

interface AuthContext {
  loading: boolean,
  error: boolean,
  auth: null | AuthUser,
  setAuth: (user: AuthUser) => void,
  revokeAuth: () => void
}

interface Props {
  children: ReactNode
}

export const __AuthContext = createContext<AuthContext>({
  loading: true,
  error: false,
  auth: null,
  setAuth: () => {},
  revokeAuth: () => {}
})

export const AuthProvider = ({ children }: Props) => {
  const { loading, error, setRequest } = useInitialContext(true, false)
  const [ auth, setStateAuth ] = useState<null | AuthUser>(null)
  const { push } = useHistory()
  const { pathname } = useLocation()

  const setAuth = useCallback((user: AuthUser) => {
    localStorage.setItem(LocalStorageKeys.TOKEN, user.token)
    setStateAuth(user)
  }, [setStateAuth])

  const revokeAuth = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.TOKEN)
    setStateAuth(null)
    push('/login')
  }, [setStateAuth, push])

  const testAuth = useCallback(async () => {
    /*
    const token = localStorage.getItem(LocalStorageKeys.TOKEN)

    if (token !== null && expires !== null) {
      const isValid = moment(expires).isAfter(moment())

      if (!isValid) {
        setRequest(false, false)
        localStorage.removeItem(LocalStorageKeys.TOKEN)
        return
      }

      try {
        const authSession = await checkSession(token)

        localStorage.setItem(LocalStorageKeys.TOKEN, authSession.token)
        setStateAuth(authSession)
      }
      catch (e) {
        localStorage.removeItem(TOKEN_STRING)
      }
    }
    */

    setTimeout(() => {
      setRequest(false, false)
    }, 600)
  }, [setStateAuth, setRequest])

  useMemo(testAuth, [setStateAuth])

  useMemo(() => {
    if (auth === null && loading === false && pathname !== '/login') {
      push({
        pathname: '/login',
        search: pathname !== '/'
          ? `?redirect=${pathname}`
          : undefined
      })
    }
  }, [loading, auth, pathname])

  return (
    <__AuthContext.Provider
      value={{
        error,
        loading,
        auth,
        setAuth,
        revokeAuth
      }}
    >
      {children}
    </__AuthContext.Provider>
  )
}

export const useAuth = (): AuthContext => useContext(__AuthContext)
