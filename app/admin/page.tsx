'use client'

import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Panel de Administración</h1>

      <p className="mb-8 text-center text-gray-600">
        Bienvenido al sistema de reservas. Desde aquí puedes gestionar todas las secciones.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <AdminCard title="Usuarios" href="/usuarios" description="Ver y gestionar todos los usuarios registrados." />
        <AdminCard title="Proveedores" href="/proveedores" description="Gestionar proveedores y su disponibilidad." />
        <AdminCard title="Reservas" href="/reservas" description="Visualizar y controlar las reservas realizadas." />
        <AdminCard title="Servicios" href="/servicios" description="Configurar los servicios disponibles." />
      </div>
    </div>
  )
}

function AdminCard({ title, href, description }: { title: string, href: string, description: string }) {
  return (
    <Link
      href={href}
      className="block border border-gray-200 rounded-lg p-6 shadow hover:shadow-md hover:border-blue-500 transition"
    >
      <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  )
}
