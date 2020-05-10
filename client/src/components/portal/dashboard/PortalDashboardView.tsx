import React from 'react'
import { ViewProps } from '@types'
import { useAuth } from '@hooks'

const PortalDashboardView = ({
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
      sdsdadsadss
    </div>
  )
}

export default PortalDashboardView
