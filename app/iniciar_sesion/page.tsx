'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function IniciarSesion() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    identificador: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Credenciales incorrectas')

      // ✅ Simular login en UI
      localStorage.setItem('loggedIn', 'true')

      // ✅ Redirigir a la ruta protegida
      router.push('/usuarios')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="identificador"
          placeholder="Correo o nombre de usuario"
          value={formData.identificador}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>

      <p className="mt-4 text-sm text-center">
        ¿No tienes cuenta?{' '}
        <a href="/usuarios/nuevo" className="text-blue-600 hover:underline">
          Regístrate
        </a>
      </p>
    </div>
  )
}
