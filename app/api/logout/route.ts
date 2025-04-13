import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ ok: true })

  response.headers.set(
    "Set-Cookie",
    `reservas_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
  )

  return response
}
