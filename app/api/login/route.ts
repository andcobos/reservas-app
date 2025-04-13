import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { identificador, password } = await request.json()

    if (!identificador || !password) {
      return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 })
    }

    // Buscar por email o por nombre
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identificador },
          { name: identificador },
        ],
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    if (user.password !== password) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
    }

    // 🔐 Aquí normalmente devolverías un token o establecerías una cookie
    return NextResponse.json({ mensaje: 'Inicio de sesión exitoso', user })
  } catch (error: any) {
    console.error('Error en login:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
