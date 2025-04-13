'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()

  const ocultarNavbar = ['/iniciar_sesion', '/usuarios/nuevo'].some(r => pathname.toLowerCase().startsWith(r))

  if (ocultarNavbar) return null

  return <Navbar />
}
