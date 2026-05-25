'use client'

import { SubmitEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import PanelUploadComponent from './PanelUploadComponent'
import { encodePath } from '@/utils/utils-browser'

export default function UploadForm({ currentPath }: { currentPath: string }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setUploading(true)
    setError('')

    const file = inputRef.current?.files?.[0]

    if (!file) {
      setUploading(false)
      setError('Choose a file first')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', currentPath)

    const response = await fetch('/api/files/upload', {
      method: 'POST',
      body: formData,
    })

    setUploading(false)

    if (!response.ok) {
      const data = await response.json()
      setError(data.error || 'Upload failed')
      return
    }

    if (inputRef.current) {
      inputRef.current.value = ''
    }

    router.refresh()
  }

  return <PanelUploadComponent handleSubmit={handleSubmit} inputRef={inputRef} uploading={uploading} error={error} />
}
