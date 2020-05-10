import React from 'react'
import { ViewProps } from '@types'
import { useAuth } from '@hooks'
import { Section } from '@components/common'

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
    <>
      <Section title='Dashboard'>
        sdsdadsadss
      </Section>
    </>
  )
}

export default PortalDashboardView
