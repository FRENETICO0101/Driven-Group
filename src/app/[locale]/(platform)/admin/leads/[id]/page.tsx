import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

import AdminLeadDetailPage from '@/components/admin/AdminLeadDetailPage'
import { getInquiryById } from '@/server/repositories/inquiry.repository'

export const metadata = {
  title: 'Detalles del Lead | Driven Group',
  description: 'Ver y gestionar detalles del lead',
}

interface AdminLeadPageProps {
  params: Promise<{
    locale: string
    id: string
  }>
}

export default async function AdminLeadPage({
  params,
}: AdminLeadPageProps) {
  const session = await auth()

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login')
  }

  const { id } = await params
  const lead = await getInquiryById(id)
  if (!lead) notFound()

  return <AdminLeadDetailPage lead={lead} />
}
