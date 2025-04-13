'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function DetalleReserva() {
  const { id } = useParams()
  const [reserva, setReserva] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarReserva = async () => {
      try {
        const res = await fetch(`/api/reservas/${id}`)
        const data = await res.json()

        if (!res.ok) throw new Error(data.error || 'Error al cargar reserva')
        setReserva(data)
      } catch (err: any) {
        setError(err.message)
      }
    }

    if (id) cargarReserva()
  }, [id])

  if (error) return <p className="text-red-600 text-center">{error}</p>
  if (!reserva) return <p className="text-center">Cargando reserva...</p>

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Detalle de la reserva</h1>
      <div className="space-y-2">
        <p><strong>Servicio:</strong> {reserva.servicio.nombre}</p>
        <p><strong>Proveedor:</strong> {reserva.proveedor.nombre} — {reserva.proveedor.especialidad}</p>
        <p><strong>Cliente:</strong> {reserva.user.name}</p>
        <p><strong>Fecha y hora:</strong> {new Date(reserva.fecha).toLocaleString()}</p>
        <p><strong>Estado:</strong> {reserva.estado}</p>
      </div>

      {/* Si quisieras permitir cancelar */}
      {/* {reserva.estado === 'PENDIENTE' && (
        <button onClick={cancelarReserva} className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
          Cancelar reserva
        </button>
      )} */}
    </div>
  )
}
