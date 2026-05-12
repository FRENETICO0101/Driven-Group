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

  // Propiedad 4: PentHouse Manhattan
  const property4 = await prisma.property.upsert({
    where: { slug: 'penthouse-manhattan' },
    update: {},
    create: {
      title: 'Penthouse Manhattan',
      slug: 'penthouse-manhattan',
      description: 'Perspectiva de élite sobre Central Park. Arquitectura que redefine lujo metropolitano. Espacio donde convergen arte, tecnología y visión empresarial. Ecosistema privado en el corazón de Nueva York.',
      price: 12500000,
      address: '740 Park Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10021',
      latitude: 40.7689,
      longitude: -73.9830,
      bedrooms: 4,
      bathrooms: 5,
      squareFeet: 8500,
      yearBuilt: 2020,
      type: PropertyType.RESIDENTIAL,
      status: PropertyStatus.ACTIVE,
      amenities: ['Central Park views', 'Private elevator', 'Wine cellar', 'Home theater', 'Gym', 'Smart home'],
      agentId: agent.id,
    },
  })

  await prisma.propertyImage.createMany({
    data: [
      { url: 'https://images.unsplash.com/photo-1512917774080-9b274b5e798a?w=1200&h=800&fit=crop', alt: 'Pentthouse Manhattan exterior', order: 0, propertyId: property4.id },
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop', alt: 'Living con vista Central Park', order: 1, propertyId: property4.id },
      { url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop', alt: 'Terraza panorámica', order: 2, propertyId: property4.id },
    ],
    skipDuplicates: true,
  })

  // Propiedad 5: Casa Costa Rica
  const property5 = await prisma.property.upsert({
    where: { slug: 'casa-costa-rica' },
    update: {},
    create: {
      title: 'Casa Costa Rica',
      slug: 'casa-costa-rica',
      description: 'Retiro tropical de lujo. Integración armónica con naturaleza preservada. Arquitectura sostenible que consolida presencia corporativa en paraíso natural. Inversión en bienestar generacional.',
      price: 4100000,
      address: 'Uvita, Puntarenas',
      city: 'Uvita',
      state: 'Puntarenas',
      zipCode: '60504',
      latitude: 9.1536,
      longitude: -83.7380,
      bedrooms: 5,
      bathrooms: 5,
      squareFeet: 9200,
      yearBuilt: 2022,
      type: PropertyType.RESIDENTIAL,
      status: PropertyStatus.ACTIVE,
      amenities: ['Ocean view', 'Jungle access', 'Infinity pool', 'Solar panels', 'Security 24/7'],
      agentId: agent.id,
    },
  })

  await prisma.propertyImage.createMany({
    data: [
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop', alt: 'Casa Costa Rica tropical', order: 0, propertyId: property5.id },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop', alt: 'Piscina infinita', order: 1, propertyId: property5.id },
      { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&h=800&fit=crop', alt: 'Vistas al océano Pacífico', order: 2, propertyId: property5.id },
    ],
    skipDuplicates: true,
  })

  // Propiedad 6: Apartamento Barcelona
  const property6 = await prisma.property.upsert({
    where: { slug: 'apartamento-barcelona' },
    update: {},
    create: {
      title: 'Apartamento Barcelona',
      slug: 'apartamento-barcelona',
      description: 'Modernidad en Eixample. Acceso a ecosistema europeo de inversión. Arquitectura que dialoga con tradición y contemporaneidad. Base estratégica para operaciones en Mediterráneo.',
      price: 3900000,
      address: 'Passeig de Gràcia 132',
      city: 'Barcelona',
      state: 'Cataluña',
      zipCode: '08008',
      latitude: 41.3911,
      longitude: 2.1649,
      bedrooms: 3,
      bathrooms: 3,
      squareFeet: 5800,
      yearBuilt: 2018,
      type: PropertyType.RESIDENTIAL,
      status: PropertyStatus.ACTIVE,
      amenities: ['Gràcia views', 'Concierge', 'Gym', 'Parking', 'Smart home'],
      agentId: agent.id,
    },
  })

  await prisma.propertyImage.createMany({
    data: [
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop', alt: 'Apartamento Barcelona interior', order: 0, propertyId: property6.id },
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop', alt: 'Living moderno', order: 1, propertyId: property6.id },
    ],
    skipDuplicates: true,
  })

  // Propiedad 7: Villa Marbella
  const property7 = await prisma.property.upsert({
    where: { slug: 'villa-marbella' },
    update: {},
    create: {
      title: 'Villa Marbella',
      slug: 'villa-marbella',
      description: 'Lujo mediterráneo en Costa del Sol. Arquitectura contemporánea con raíces españolas. Acceso a red de inversión europeo-africana. Patrimonio en expansión internacional.',
      price: 6800000,
      address: 'Sierra Blanca, Marbella',
      city: 'Marbella',
      state: 'Málaga',
      zipCode: '29600',
      latitude: 36.5031,
      longitude: -5.1111,
      bedrooms: 6,
      bathrooms: 6,
      squareFeet: 12000,
      yearBuilt: 2021,
      type: PropertyType.RESIDENTIAL,
      status: PropertyStatus.ACTIVE,
      amenities: ['Sea view', 'Heated pool', 'Cinema', 'Spa', 'Security', 'Wine room'],
      agentId: agent.id,
    },
  })

  await prisma.propertyImage.createMany({
    data: [
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', alt: 'Villa Marbella exterior', order: 0, propertyId: property7.id },
      { url: 'https://images.unsplash.com/photo-1512917774080-9b274b5e798a?w=1200&h=800&fit=crop', alt: 'Piscina con vista al mar', order: 1, propertyId: property7.id },
    ],
    skipDuplicates: true,
  })

  // Propiedad 8: Apartamento Singapur
  const property8 = await prisma.property.upsert({
    where: { slug: 'apartamento-singapur' },
    update: {},
    create: {
      title: 'Apartamento Singapur',
      slug: 'apartamento-singapur',
      description: 'Gateway asiático. Tecnología y eficiencia urbana consolidada. Acceso a economías emergentes de Asia. Inversión en futuro estratégico.',
      price: 5400000,
      address: 'Marina Bay, Singapur',
      city: 'Singapur',
      state: 'Singapur',
      zipCode: '018956',
      latitude: 1.2829,
      longitude: 103.8543,
      bedrooms: 4,
      bathrooms: 4,
      squareFeet: 6800,
      yearBuilt: 2023,
      type: PropertyType.RESIDENTIAL,
      status: PropertyStatus.ACTIVE,
      amenities: ['Marina view', 'Luxury concierge', 'Rooftop pool', 'Spa', 'Home office'],
      agentId: agent.id,
    },
  })

  await prisma.propertyImage.createMany({
    data: [
      { url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop', alt: 'Apartamento Singapur skyline', order: 0, propertyId: property8.id },
      { url: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=1200&h=800&fit=crop', alt: 'Interior moderno', order: 1, propertyId: property8.id },
    ],
    skipDuplicates: true,
  })

  // Propiedad 9: Casa Dubai
  const property9 = await prisma.property.upsert({
    where: { slug: 'casa-dubai' },
    update: {},
    create: {
      title: 'Casa Dubai',
      slug: 'casa-dubai',
      description: 'Emiratos unidos. Lujo desértico con conectividad global. Arquitectura futurista en oasis urbano. Inversión en eje de poder económico medio-oriental.',
      price: 9200000,
      address: 'Palm Jumeirah, Dubai',
      city: 'Dubai',
      state: 'Dubai',
      zipCode: '0000',
      latitude: 25.1165,
      longitude: 55.1391,
      bedrooms: 5,
      bathrooms: 5,
      squareFeet: 10500,
      yearBuilt: 2022,
      type: PropertyType.RESIDENTIAL,
      status: PropertyStatus.ACTIVE,
      amenities: ['Palm access', 'Private beach', 'Infinity pool', 'Smart automation', 'VIP security'],
      agentId: agent.id,
    },
  })

  await prisma.propertyImage.createMany({
    data: [
      { url: 'https://images.unsplash.com/photo-1578052894f9404b312d1a52abea6c68e5a0ed62?w=1200&h=800&fit=crop', alt: 'Casa Dubai Palm Jumeirah', order: 0, propertyId: property9.id },
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop', alt: 'Interior de lujo', order: 1, propertyId: property9.id },
    ],
    skipDuplicates: true,
  })

  // Propiedad 10: Penthouse Tokio
  const property10 = await prisma.property.upsert({
    where: { slug: 'penthouse-tokio' },
    update: {},
    create: {
      title: 'Penthouse Tokio',
      slug: 'penthouse-tokio',
      description: 'Japón en altura. Tecnología nipona avanzada integrada. Puerta a mercados asiáticos. Arquitectura minimalista que expande horizonte corporativo. Futuro consolidado en presente.',
      price: 7800000,
      address: 'Minato Ward, Tokio',
      city: 'Tokio',
      state: 'Tokio',
      zipCode: '1060032',
      latitude: 35.6895,
      longitude: 139.6917,
      bedrooms: 4,
      bathrooms: 4,
      squareFeet: 7200,
      yearBuilt: 2023,
      type: PropertyType.RESIDENTIAL,
      status: PropertyStatus.ACTIVE,
      amenities: ['City view', 'Smart home JP', 'Onsen bath', 'Elevator private', 'Concierge 24h'],
      agentId: agent.id,
    },
  })

  await prisma.propertyImage.createMany({
    data: [
      { url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop', alt: 'Penthouse Tokio vista nocturna', order: 0, propertyId: property10.id },
      { url: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=1200&h=800&fit=crop', alt: 'Interior minimalista', order: 1, propertyId: property10.id },
    ],
    skipDuplicates: true,
  })

  console.log('✓ Propiedades 4-10 creadas: 7 residencias premium adicionales')

  console.log('\n✅ Seed completado exitosamente')
  console.log(`
    📊 Resumen:
    - Agent: ${agent.name}
    - Propiedades: 10
    - Imágenes: 28
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
