'use client'

import { useEffect, useState } from 'react'

type UserSession = {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'PROVEEDOR' | 'CLIENTE'
}

export default function useUserRole() {
  const [user, setUser] = useState<UserSession | null>(null)

  useEffect(() => {
    const raw = document.cookie
      .split('; ')
      .find(c => c.startsWith('reservas_session='))

    if (raw) {
      try {
        const value = raw.split('=')[1]
        const decoded = JSON.parse(decodeURIComponent(value))
        setUser(decoded)
      } catch (e) {
        console.warn('Error al leer cookie reservas_session')
        setUser(null)
      }
    }
  }, [])

  return {
    user,
    role: user?.role || null,
    isAdmin: user?.role === 'ADMIN',
    isProveedor: user?.role === 'PROVEEDOR',
    isCliente: user?.role === 'CLIENTE',
    isLoggedIn: !!user,
  }
}
