import React from 'react'
import { ViewProps } from '@types'
import { useAuth } from '@hooks'
import { Section, ActionButton, InnerNotAccessed } from '@components/common'
import { Plus } from 'mdi-material-ui'

const CustomersView = ({
  access
}: ViewProps) => {
  const { auth } = useAuth()
  const hasAccess = auth !== null && access.indexOf(auth.user.role) !== -1

  if (!hasAccess || !auth) {
    return (
      <InnerNotAccessed role={auth?.user.role} />
    )
  }

  return (
    <>
      <Section title='Customers'>
        customers
      </Section>
      <ActionButton
        title='Add new customer'
        onClick={() => {}}
        icon={<Plus />}
        color='secondary'
        single
      />
    </>
  )
}

export default CustomersView
