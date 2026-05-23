'use client'

import { SubmitEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const form = new FormData(event.currentTarget)

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.get('username'),
        email: form.get('email'),
        password: form.get('password'),
      }),
    })

    setLoading(false)

    if (!response.ok) {
      const data = await response.json()
      setError(data.error || 'Registration failed')
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
      >
        <h1 className='text-3xl font-bold'>Register</h1>

        <input
          name='username'
          placeholder='Username'
          required
          className='mt-6 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-4 dark:border-white/10 dark:bg-zinc-950'
        />

        <input
          name='email'
          type='email'
          placeholder='Email'
          required
          className='mt-3 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-4 dark:border-white/10 dark:bg-zinc-950'
        />

        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          minLength={8}
          className='mt-3 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:ring-4 dark:border-white/10 dark:bg-zinc-950'
        />

        {error && <p className='mt-4 text-sm text-red-500'>{error}</p>}

        <button
          disabled={loading}
          className='mt-6 w-full cursor-pointer rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:opcity-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white'
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className='mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400'>
          Already have an account?{' '}
          <Link href='/login' className='text-zinc-900 underline dark:text-zinc-100'>
            Login
          </Link>
        </p>

        <p className='mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400'>
          Back to home{' '}
          <Link href='/' className='text-zinc-900 underline dark:text-zinc-100'>
            Home
          </Link>
        </p>
      </form>
    </main>
  )
}
