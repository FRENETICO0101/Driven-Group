import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

import AdminPropertyNewPage from '@/components/admin/AdminPropertyNewPage'

export const metadata = {
  title: 'Nueva Propiedad | Driven Group',
  description: 'Crear una nueva propiedad premium',
}

export default async function NewPropertyPage() {
  const session = await auth()

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login')
  }

  return <AdminPropertyNewPage />
}
