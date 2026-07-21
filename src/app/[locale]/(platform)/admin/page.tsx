import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

import AdminDashboard from '@/components/admin/AdminDashboard'

export const metadata = {
  title: 'Admin Dashboard | Driven Group',
  description: 'Administración de propiedades y leads',
}

export default async function AdminPage() {
  const session = await auth()

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login')
  }

  return <AdminDashboard />
}
