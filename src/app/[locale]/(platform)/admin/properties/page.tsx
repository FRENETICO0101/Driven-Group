import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

import AdminPropertiesPage from '@/components/admin/AdminPropertiesPage'
import { getManagedProperties } from '@/server/services/property.service'

export const metadata = {
  title: 'Administrar Propiedades | Driven Group',
  description: 'Gestión de propiedades premium',
}

export default async function PropertiesAdminPage() {
  const session = await auth()

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login')
  }

  const properties = await getManagedProperties()
  return <AdminPropertiesPage properties={properties} />
}
