'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useUserRole from '../hooks/useUserRole'

export default function Navbar() {
  const router = useRouter()
  const { isAdmin, isProveedor, isLoggedIn } = useUserRole()

  const cerrarSesion = async () => {
    await fetch('/api/logout', { method: 'POST' })
    localStorage.removeItem('loggedIn') 
    router.push('/iniciar_sesion')
  }

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:opacity-80">
          Sistema de Reservas
        </Link>

        <ul className="flex gap-4 text-sm">
          <li>
            <Link href="/reservas/nueva" className="hover:underline">
              Nueva Reserva
            </Link>
          </li>

          {isProveedor && (
            <li>
              <Link href="/proveedores" className="hover:underline">
                Proveedores
              </Link>
            </li>
          )}

          {isAdmin && (
            <li>
              <Link href="/admin" className="hover:underline">
                Panel Admin
              </Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={cerrarSesion} className="hover:underline">
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
