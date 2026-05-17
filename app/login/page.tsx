'use client'

import { SubmitEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const form = new FormData(event.currentTarget)

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: form.get('login'),
        password: form.get('password'),
      }),
    })

    setLoading(false)

    if (!response.ok) {
      const data = await response.json()
      setError(data.error || 'Login failed')
      return
    }

    router.push('/my-files')
    router.refresh()
  }

  return (
    <main className='min-h-screen bg-zinc-50 px-3 py-10 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100'>
      <form
        onSubmit={handleSubmit}
        className='mx-auto max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 ring-1 ring-zinc-200 dark:border-white/10 dark:bg-white/5 dark:ring-white/10'
      ></form>
    </main>
  )
}
