import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

import AdminLeadsPage from '@/components/admin/AdminLeadsPage'
import { getInquiries } from '@/server/repositories/inquiry.repository'

export const metadata = {
  title: 'Administrar Leads | Driven Group',
  description: 'Gestión de inquiries y leads de propiedades',
}

export default async function LeadsAdminPage() {
  const session = await auth()

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login')
  }

  const leads = await getInquiries()
  return <AdminLeadsPage leads={leads} />
}
