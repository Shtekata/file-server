'use client'

import { SubmitEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import PanelUploadComponent from './PanelUploadComponent'
import { encodePath } from '@/utils/utils-browser'

export default function UploadForm({ currentPath, userId }: { currentPath: string; userId: string }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function uploadFile(file: File, userId: string) {
    const encodedCurrentPath = encodePath(currentPath)
    const encodedFileName = encodeURIComponent(file.name)

    const uploadPath = encodedCurrentPath
      ? `/protected-uploads/${userId}/${encodedCurrentPath}/${encodedFileName}`
      : `/protected-uploads/${userId}/${encodedFileName}`

    const response = await fetch(uploadPath, {
      method: 'PUT',
      body: file,
      credentials: 'include',
    })

    if (!response.ok) throw new Error('Upload failed')
  }

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

    try {
      await uploadFile(file, userId)
      if (inputRef.current) inputRef.current.value = ''
      router.refresh()
    } catch (err) {
      setError((err as Error).message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return <PanelUploadComponent handleSubmit={handleSubmit} inputRef={inputRef} uploading={uploading} error={error} />
}
