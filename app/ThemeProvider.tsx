'use client'

import { useEffect } from 'react'

type Theme = 'light' | 'dark'

export default function ThemeProvider() {
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    const nextTheme = saved || 'light'

    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }, [])

  return null
}
