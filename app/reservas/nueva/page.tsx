'use client'

import { useEffect, useState } from 'react'

export default function NuevaReserva() {
  const [servicios, setServicios] = useState<any[]>([])
  const [proveedores, setProveedores] = useState<any[]>([])
  const [mensaje, setMensaje] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  const [form, setForm] = useState({
    servicioId: '',
    proveedorId: '',
    fecha: '',
  })

  useEffect(() => {
    // Leer el userId desde la cookie reservas_session
    const cookie = document.cookie
      .split('; ')
      .find((c) => c.startsWith('reservas_session='))

    if (cookie) {
      try {
        const data = JSON.parse(decodeURIComponent(cookie.split('=')[1]))
        setUserId(data.id)
      } catch (e) {
        console.warn('⚠️ Error leyendo la cookie de sesión', e)
      }
    }

    // Cargar servicios y proveedores desde API
    const cargarDatos = async () => {
      const resServicios = await fetch('/api/servicios')
      const dataServicios = await resServicios.json()
      setServicios(dataServicios)

      const resProveedores = await fetch('/api/proveedores')
      const dataProveedores = await resProveedores.json()
      setProveedores(dataProveedores)
    }

    cargarDatos()
  }, [])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setMensaje('')

    if (!userId) {
      setMensaje('⚠️ No hay sesión activa')
      return
    }

    const res = await fetch('/api/reservas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, userId }),
    })

    const data = await res.json()
    if (res.ok) {
      setMensaje('✅ Reserva creada correctamente')
      setForm({ servicioId: '', proveedorId: '', fecha: '' })
    } else {
      setMensaje(`❌ Error: ${data.error}`)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Reservar una cita</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Servicio médico</label>
          <select
            name="servicioId"
            value={form.servicioId}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Selecciona un servicio</option>
            {servicios.map((s) => (
              <option key={s.id} value={s.id}>{s.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Proveedor (doctor)</label>
          <select
            name="proveedorId"
            value={form.proveedorId}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Selecciona un proveedor</option>
            {proveedores.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} — {p.especialidad}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Fecha y hora</label>
          <input
            type="datetime-local"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Reservar
        </button>

        {mensaje && (
          <p className="text-center mt-4 text-sm">{mensaje}</p>
        )}
      </form>
    </div>
  )
}
