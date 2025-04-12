'use client'

import { useState } from 'react'

export default function NuevoUsuario() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CLIENTE',
  })

  const [mensaje, setMensaje] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensaje('')

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      setMensaje('✅ Usuario creado correctamente')
      setFormData({ name: '', email: '', password: '', role: 'CLIENTE' })
    } else {
      const data = await res.json()
      setMensaje(`Error: ${data.error || 'No se pudo crear el usuario'}`)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nuevo Usuario</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          className="w-full border p-2 rounded"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="CLIENTE">Cliente</option>
          <option value="ADMIN">Administrador</option>
          <option value="PROVEEDOR">Proveedor</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Crear Usuario
        </button>
      </form>

      {mensaje && <p className="mt-4 text-sm">{mensaje}</p>}
    </div>
  )
}
