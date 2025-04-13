import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas protegidas por rol
const protectedRoutes = [
  { path: '/admin', role: 'ADMIN' },
  { path: '/proveedores', role: 'PROVEEDOR' },
  { path: '/cliente', role: 'CLIENTE' },
]

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const cookie = req.cookies.get('reservas_session')?.value

  if (!cookie) {
    const isProtected = protectedRoutes.some(r => pathname.startsWith(r.path))
    if (isProtected) {
      return NextResponse.redirect(new URL('/iniciar-sesion', req.url))
    }
    return NextResponse.next()
  }

  let user: { role?: string } = {}

  try {
    user = JSON.parse(decodeURIComponent(cookie))
  } catch (e) {
    console.warn("Cookie corrupta o mal formateada")
  }

  const rutaConRol = protectedRoutes.find(r => pathname.startsWith(r.path))

  if (user.role === 'ADMIN') {
    return NextResponse.next()
  }

  // 🔒 Si la ruta requiere otro rol específico
  if (rutaConRol && user.role !== rutaConRol.role) {
    return NextResponse.redirect(new URL('/iniciar-sesion', req.url))
  }

  return NextResponse.next()
}
