import React from 'react'
import { ViewProps } from '@types'
import { useAuth } from '@hooks'
import { Link } from 'react-router-dom'

const DriverDashboardView = ({
  access
}: ViewProps) => {
  const { auth } = useAuth()
  const hasAccess = auth !== null && access.indexOf(auth.user.role) !== -1

  if (!hasAccess || !auth) {
    return (
      <div>
        KEKW
      </div>
    )
  }

  return (
    <div>
      <Link to='/driver/vehicles'>vehicles</Link>
    </div>
  )
}

export default DriverDashboardView
