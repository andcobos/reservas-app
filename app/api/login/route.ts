import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { identificador, password } = await req.json()

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identificador }, { name: identificador }],
      password, // ❗ En producción usar hash
    },
  })

  if (!user) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 })
  }

  // Crear cookie personalizada
  const sessionData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }

  const cookieValue = encodeURIComponent(JSON.stringify(sessionData))

  const response = NextResponse.json({ ok: true })

  response.headers.set(
    "Set-Cookie",
    `reservas_session=${cookieValue}; Path=/; HttpOnly; Secure; SameSite=Lax`
  )

  return response
}
