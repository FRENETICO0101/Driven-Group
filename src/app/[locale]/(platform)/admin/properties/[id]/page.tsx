import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

import { PropertyForm } from '@/components/admin/PropertyForm'
import { propertyRepository } from '@/server/repositories/property.repository'

export const metadata = {
  title: 'Editar Propiedad | Driven Group',
  description: 'Editar detalles de la propiedad',
}

interface AdminPropertyPageProps {
  params: Promise<{
    locale: string
    id: string
  }>
}

export default async function AdminPropertyPage({
  params,
}: AdminPropertyPageProps) {
  const session = await auth()

  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/login')
  }

  const { id } = await params
  const property = await propertyRepository.getById(id)
  if (!property) notFound()

  return <PropertyForm propertyId={id} initialData={property} />
}
