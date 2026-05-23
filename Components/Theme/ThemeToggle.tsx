'use client'

import { Theme } from '@/lib/types'
import { useEffect, useState } from 'react'
import { ButtonTheme } from '../Common/Buttons'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    const nextTheme = saved || 'light'

    setTheme(nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light'

    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }

  return <ButtonTheme theme={theme} onClick={toggleTheme} />
}
