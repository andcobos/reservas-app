'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [usuarioActivo, setUsuarioActivo] = useState(false)
  const router = useRouter()

  // Simula si el usuario está logueado (ej: se guarda un token)
  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn')
    setUsuarioActivo(loggedIn === 'true')
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('loggedIn') // limpiamos el estado
    setUsuarioActivo(false)
    router.push('/iniciar-sesion') // redirige
  }

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:opacity-80">
          Sistema de Reservas
        </Link>

        <ul className="flex gap-4 text-sm">
          <li>
            <Link href="/reservas/nueva" className="hover:underline">Nueva Reserva</Link>
          </li>
          <li>
            <Link href="/proveedores" className="hover:underline">Proveedores</Link>
          </li>
          {!usuarioActivo ? (
            <>
              <li>
                <Link href="/usuarios/nuevo" className="hover:underline">Registrarse</Link>
              </li>
              <li>
                <Link href="/iniciar_sesion" className="hover:underline">Iniciar sesión</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={cerrarSesion} className="hover:underline">Cerrar sesión</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
