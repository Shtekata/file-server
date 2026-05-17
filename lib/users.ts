import bcrypt from 'bcryptjs'
import { db } from './db'

export type User = {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
}

export async function findUserByLogin(login: string) {
  const result = await db.query(
    `SELECT id, username, email, password_hash, role FROM users WHERE username = $1 OR email = $1 LIMIT 1`,
    [login],
  )

  return result.rows[0] ?? null
}

export async function createUser({ username, email, password }: { username: string; email: string; password: string }) {
  const passwordHash = await bcrypt.hash(password, 12)

  const result = await db.query(
    `INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, role`,
    [username, email, passwordHash],
  )

  return result.rows[0] as User
}

export async function verifyPassword(password: string, passwordHash: string) {
  return await bcrypt.compare(password, passwordHash)
}
