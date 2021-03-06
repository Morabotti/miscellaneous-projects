import { useEffect, useCallback } from 'react'
import { useInitialContext, useAuth } from '@hooks'
import { AuthUser, AuthRoles } from '@types'
import { useHistory, useLocation } from 'react-router'
import { routes } from '@components/Application'

interface LoginContext {
  error: boolean,
  loading: boolean,
  login: (role: AuthRoles) => Promise<void>
}

export const useLogin = (): LoginContext => {
  const { loading, error } = useInitialContext(false, false)
  const { search } = useLocation()
  const { push } = useHistory()
  const { setAuth, auth } = useAuth()

  const login = useCallback(async (role: AuthRoles) => {
    const authUser: AuthUser = {
      token: '12341234514654364352343214312321213',
      user: {
        id: '344213-21ads21312-dada5342-asde23',
        name: 'Testi User',
        role,
        email: 'test.user@testing.com',
        createdAt: '22.22.2222'
      }
    }

    setAuth(authUser)
  }, [setAuth])

  useEffect(() => {
    if (auth !== null) {
      if (search !== '') {
        // eslint-disable-next-line
        push(search.replace(/^.*?\=/, ''))
      }
      else {
        const route = routes.find(i => i.access.includes(auth.user.role))
        if (!route) {
          push('/')
          console.log('No route found')
          return
        }

        push(route.path)
      }
    }
  }, [auth, push, search])

  return {
    error,
    loading,
    login
  }
}
