import { User, NewUser, ResetPassword } from '@types'

export const checkResponse = (res: Response): Promise<Response> => {
  if (!res.ok) {
    return res.text()
      .then((text) => {
        try {
          const jsonError = JSON.parse(text)
          if (jsonError.message) {
            return jsonError.message
          }
          return text
        }
        catch (e) {
          return text
        }
      })
      .then((message) => Promise.reject(new Error(`${message} (HTTP ${res.status.toString()})`)))
  }
  return Promise.resolve(res)
}

export const getUsers = (): Promise<User[]> => fetch(
  '/api/user',
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const addNewUser = (user: NewUser): Promise<User> => fetch(
  '/api/user',
  {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const deleteUser = (id: string): Promise<Response> => fetch(
  `/api/user/${id}`,
  {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)

export const deleteMultipleUsers = (users: string[]): Promise<Response> => fetch(
  `/api/user/multiple`,
  {
    method: 'DELETE',
    body: JSON.stringify(users),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)

export const resetPassword = (id: string, password: ResetPassword): Promise<User> => fetch(
  `/api/user/reset-password/${id}`,
  {
    method: 'PUT',
    body: JSON.stringify(password),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())

export const editUser = (user: User): Promise<User> => fetch(
  `/api/user/${user.id}`,
  {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' }
  }
)
  .then(checkResponse)
  .then((res) => res.json())
