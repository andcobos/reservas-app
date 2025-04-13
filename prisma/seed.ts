import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Crear servicios médicos
  const servicios = await prisma.servicio.createMany({
    data: [
      { nombre: 'Consulta General', descripcion: 'Chequeo general con médico', duracion: 30, precio: 25 },
      { nombre: 'Odontología', descripcion: 'Evaluación y limpieza dental', duracion: 45, precio: 40 },
      { nombre: 'Pediatría', descripcion: 'Atención para niños', duracion: 30, precio: 35 },
    ],
  })

  // Crear proveedores (usuarios con rol PROVEEDOR)
  const proveedorUsuarios = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Dra. Ana López',
        email: 'ana.lopez@clinic.com',
        password: 'doctor123',
        role: 'PROVEEDOR',
        proveedor: {
          create: {
            nombre: 'Dra. Ana López',
            especialidad: 'Medicina General',
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'Dr. Carlos Ramos',
        email: 'carlos.ramos@clinic.com',
        password: 'doctor123',
        role: 'PROVEEDOR',
        proveedor: {
          create: {
            nombre: 'Dr. Carlos Ramos',
            especialidad: 'Odontología',
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'Dra. Sofía Méndez',
        email: 'sofia.mendez@clinic.com',
        password: 'doctor123',
        role: 'PROVEEDOR',
        proveedor: {
          create: {
            nombre: 'Dra. Sofía Méndez',
            especialidad: 'Pediatría',
          },
        },
      },
    }),
  ])

  // Crear clientes (usuarios normales)
  const clientes = await prisma.user.createMany({
    data: [
      { name: 'Juan Pérez', email: 'juan@correo.com', password: 'cliente123', role: 'CLIENTE' },
      { name: 'María García', email: 'maria@correo.com', password: 'cliente123', role: 'CLIENTE' },
      { name: 'Luis Torres', email: 'luis@correo.com', password: 'cliente123', role: 'CLIENTE' },
    ],
  })

  // Obtener IDs para crear una reserva
  const servicio = await prisma.servicio.findFirst({ where: { nombre: 'Consulta General' } })
  const proveedor = await prisma.proveedor.findFirst({ where: { especialidad: 'Medicina General' } })
  const cliente = await prisma.user.findFirst({ where: { role: 'CLIENTE' } })

  if (servicio && proveedor && cliente) {
    await prisma.reserva.create({
      data: {
        fecha: new Date(), // ahora
        servicioId: servicio.id,
        proveedorId: proveedor.id,
        userId: cliente.id,
        estado: 'PENDIENTE',
      },
    })
  }

  console.log('✅ Seed completado con éxito')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
