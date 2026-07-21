import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

import AdminPropertiesPage from '@/components/admin/AdminPropertiesPage'
import { propertyRepository } from '@/server/repositories/property.repository'

export const metadata = {
  title: 'Administrar Propiedades | Driven Group',
  description: 'Gestión de propiedades premium',
}

export default async function PropertiesAdminPage() {
  const session = await auth()

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login')
  }

  const properties = await propertyRepository.getAll()
  return <AdminPropertiesPage properties={properties} />
}
