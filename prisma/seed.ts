import { PrismaClient, PropertyType, PropertyStatus, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de propiedades premium...')

  // Crear agente admin (requerido por FK)
  const agent = await prisma.user.upsert({
    where: { email: 'properties@drivengroup.com' },
    update: {},
    create: {
      email: 'properties@drivengroup.com',
      name: 'Driven Properties',
      role: Role.AGENT,
      password: null,
    },
  })

  console.log('✓ Agente creado:', agent.email)

  // Propiedad 1: Torre Corporativa Miami
  const property1 = await prisma.property.upsert({
    where: { slug: 'torre-corporativa-miami' },
    update: {},
    create: {
      title: 'Torre Corporativa Miami',
      slug: 'torre-corporativa-miami',
      description:
        'Punto de convergencia estratégica en el corazón financiero de Miami. Arquitectura de vanguardia que consolida operaciones globales. Diseño de espacios que expande visión empresarial hacia ecosistemas emergentes. 42 pisos de oportunidad inversora.',
      price: 8500000,
      address: '100 Biscayne Boulevard',
      city: 'Miami',
      state: 'Florida',
      zipCode: '33131',
      latitude: 25.7617,
      longitude: -80.1918,
      bedrooms: 0,
      bathrooms: 0,
      squareFeet: 180000,
      yearBuilt: 2022,
      type: PropertyType.COMMERCIAL,
      status: PropertyStatus.ACTIVE,
      amenities: [
        'Trading floor',
        'Executive suites',
        'Private elevators',
        'Rooftop terrace',
        'State-of-the-art infrastructure',
        'Secure parking',
        'Conference centers',
      ],
      agentId: agent.id,
    },
  })

  // Imágenes Torre Corporativa
  await prisma.propertyImage.createMany({
    data: [
      {
        url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop',
        alt: 'Torre corporativa Miami vista exterior',
        order: 0,
        propertyId: property1.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
        alt: 'Lobby ejecutivo con diseño minimalista',
        order: 1,
        propertyId: property1.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
        alt: 'Trading floor de última generación',
        order: 2,
        propertyId: property1.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop',
        alt: 'Terraza con vista del skyline Miami',
        order: 3,
        propertyId: property1.id,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✓ Propiedad 1 creada: Torre Corporativa Miami')

  // Propiedad 2: Quinta Inversión Viña del Mar
  const property2 = await prisma.property.upsert({
    where: { slug: 'quinta-inversion-vina-del-mar' },
    update: {},
    create: {
      title: 'Quinta Inversión Viña del Mar',
      slug: 'quinta-inversion-vina-del-mar',
      description:
        'Refugio patrimonial frente al Pacífico. Privacidad absoluta en enclave de dos hectáreas. Arquitectura que honra el legado generacional. Espacio donde la visión familiar se expande sin límites. Inversión en permanencia.',
      price: 5200000,
      address: 'Camino Viejo a Reñaca km 3.5',
      city: 'Viña del Mar',
      state: 'Valparaíso',
      zipCode: '2520000',
      latitude: -33.0327,
      longitude: -71.5463,
      bedrooms: 5,
      bathrooms: 6,
      squareFeet: 12000,
      lotSize: 87120,
      yearBuilt: 2019,
      type: PropertyType.RESIDENTIAL,
      status: PropertyStatus.ACTIVE,
      amenities: [
        'Océano privado acceso',
        'Piscina temperada',
        'Wine cellar',
        'Home office suite',
        'Jardines diseñados',
        'Garaje para 6 vehículos',
        'Seguridad 24/7',
        'Helipad infrastructure',
      ],
      agentId: agent.id,
    },
  })

  // Imágenes Quinta Viña del Mar
  await prisma.propertyImage.createMany({
    data: [
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9b274b5e798a?w=1200&h=800&fit=crop',
        alt: 'Fachada de quinta con vistas al océano Pacífico',
        order: 0,
        propertyId: property2.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop',
        alt: 'Living principal con arquitectura minimalista',
        order: 1,
        propertyId: property2.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop',
        alt: 'Vista panorámica del océano desde la terraza',
        order: 2,
        propertyId: property2.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1523217311519-3f3a490881cb?w=1200&h=800&fit=crop',
        alt: 'Jardines paisajísticos de dos hectáreas',
        order: 3,
        propertyId: property2.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
        alt: 'Piscina temperada rodeada de naturaleza',
        order: 4,
        propertyId: property2.id,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✓ Propiedad 2 creada: Quinta Inversión Viña del Mar')

  // Propiedad 3: Loft Urbano São Paulo
  const property3 = await prisma.property.upsert({
    where: { slug: 'loft-urbano-sao-paulo' },
    update: {},
    create: {
      title: 'Loft Urbano São Paulo',
      slug: 'loft-urbano-sao-paulo',
      description:
        'Expansión urbana. Materialidad minimal que conversa con el pulso de la ciudad. Ecosistema creativo consolidado en Vila Mariana. Espacios donde la arquitectura acompaña pensamiento estratégico. Inversión en presencia contemporánea.',
      price: 3800000,
      address: 'Rua Vergueiro 3000, Vila Mariana',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01504-001',
      latitude: -23.5849,
      longitude: -46.6426,
      bedrooms: 3,
      bathrooms: 4,
      squareFeet: 6500,
      yearBuilt: 2021,
      type: PropertyType.RESIDENTIAL,
      status: PropertyStatus.ACTIVE,
      amenities: [
        'Open space design',
        'Pé-direito duplo',
        'Terraço panorâmico',
        'Home theater',
        'Wine storage',
        'Smart home system',
        'Garagem automática',
        'Concierge service',
      ],
      agentId: agent.id,
    },
  })

  // Imágenes Loft São Paulo
  await prisma.propertyImage.createMany({
    data: [
      {
        url: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=1200&h=800&fit=crop',
        alt: 'Entrada loft con diseño contemporáneo minimalista',
        order: 0,
        propertyId: property3.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop',
        alt: 'Open space con pé-direito duplo y iluminación natural',
        order: 1,
        propertyId: property3.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop',
        alt: 'Living con detalles arquitectónicos de diseño',
        order: 2,
        propertyId: property3.id,
      },
      {
        url: 'https://images.unsplash.com/photo-1551632786-de41ec08fcaa?w=1200&h=800&fit=crop',
        alt: 'Terraço panorámico con vista urbana',
        order: 3,
        propertyId: property3.id,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✓ Propiedad 3 creada: Loft Urbano São Paulo')

  console.log('\n✅ Seed completado exitosamente')
  console.log(`
    📊 Resumen:
    - Agent: ${agent.name}
    - Propiedades: 3
    - Imágenes: 13
  `)
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
