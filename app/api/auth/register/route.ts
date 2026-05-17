import { NextResponse } from 'next/server'
import { createSession } from '@/lib/session'
import { createUser } from '@/lib/users'

export async function POST(request: Request) {
  const { username, email, password } = await request.json()

  if (!username || !email || !password) {
    return NextResponse.json({ error: 'Username, email and password are required' }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 })
  }

  try {
    const user = await createUser({ username, email, password })
    await createSession(user)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Username or email already exists' }, { status: 409 })
  }
}
