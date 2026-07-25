import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

import AdminDashboard from '@/components/admin/AdminDashboard'
import { getInquiries } from '@/server/repositories/inquiry.repository'
import { getManagedProperties } from '@/server/services/property.service'

export const metadata = {
  title: 'Admin Dashboard | Driven Group',
  description: 'Administración de propiedades y leads',
}

export default async function AdminPage() {
  const session = await auth()

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login')
  }

  const [properties, inquiries] = await Promise.all([
    getManagedProperties(),
    getInquiries(),
  ])

  return (
    <AdminDashboard
      propertyCount={properties.length}
      inquiryCount={inquiries.length}
      newInquiryCount={inquiries.filter((inquiry) => inquiry.status === 'NEW').length}
    />
  )
}
