import { SessionOptions } from "iron-session"
import { getIronSession } from "iron-session"
import type { NextApiRequest, NextApiResponse } from "next"

export type UserSession = {
  id: string
  name: string
  email: string
  role: "CLIENTE" | "ADMIN" | "PROVEEDOR"
}

export const sessionOptions: SessionOptions = {
  cookieName: "reservas_session",
  password: process.env.SESSION_SECRET || "clave-muy-segura-123456789",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}

// ✅ Para usar en endpoints como /api/login
export function getSessionFromApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return getIronSession<UserSession>(req, res, sessionOptions)
}
