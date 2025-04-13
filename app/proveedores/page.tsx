'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ListaProveedores() {
  const [proveedores, setProveedores] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/proveedores')
      .then((res) => res.json())
      .then(setProveedores)
  }, [])

  const manejarReserva = (proveedorId: string) => {
    router.push(`/reservas/nueva?proveedorId=${proveedorId}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Nuestros Proveedores</h1>

      {proveedores.length === 0 ? (
        <p className="text-center text-gray-600">Cargando proveedores...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {proveedores.map((p: any) => (
            <div key={p.id} className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-1">{p.nombre}</h2>
              <p className="text-sm text-gray-600 mb-3">{p.especialidad}</p>
              <button
                onClick={() => manejarReserva(p.id)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
              >
                Reservar con este proveedor
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
