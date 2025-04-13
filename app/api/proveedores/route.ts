import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const proveedores = await prisma.proveedor.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })


    const resultado = proveedores.map((p) => ({
      id: p.id,
      nombre: p.nombre || p.user.name,
      especialidad: p.especialidad,
    }))

    return NextResponse.json(resultado)
  } catch (error) {
    console.error('Error al obtener proveedores:', error)
    return NextResponse.json({ error: 'Error al obtener proveedores' }, { status: 500 })
  }
}
