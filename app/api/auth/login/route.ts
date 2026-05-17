import { NextResponse } from 'next/server'
import { createSession } from '@/lib/session'
import { findUserByLogin, verifyPassword } from '@/lib/users'

export async function POST(request: Request) {
  const { login, password } = await request.json()

  if (!login || !password) {
    return NextResponse.json({ error: 'Login and password are required' }, { status: 400 })
  }

  const user = await findUserByLogin(login)

  if (!user) {
    return NextResponse.json({ error: 'Invalid login or password' }, { status: 400 })
  }

  const validPassword = await verifyPassword(password, user.password_hash)

  if (!validPassword) {
    return NextResponse.json({ error: 'Invalid login or password' }, { status: 400 })
  }

  await createSession({ id: user.id, username: user.username, email: user.email, role: user.role })

  return NextResponse.json({ ok: true })
}
