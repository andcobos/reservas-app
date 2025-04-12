'use client'

import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<User[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await fetch('/api/users')
        const data = await res.json()
        setUsuarios(data)
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
      } finally {
        setCargando(false)
      }
    }

    obtenerUsuarios()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Usuarios registrados</h1>

      {cargando ? (
        <p>Cargando...</p>
      ) : usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Correo</th>
              <th className="border p-2">Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="border p-2">{usuario.name}</td>
                <td className="border p-2">{usuario.email}</td>
                <td className="border p-2">{usuario.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
