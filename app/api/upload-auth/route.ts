import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session'

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  const originalUri = request.headers.get('x-original-uri')
  if (!originalUri) return new NextResponse('Missing URI', { status: 400 })

  const path = decodeURIComponent(originalUri.replace('/protected-uploads/', ''))

  if (!path.startsWith(`${user.id}`)) return new NextResponse('Forbidden', { status: 403 })

  return new NextResponse('OK', { status: 200 })
}
