'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'

export default function BackButton() {
  return (
    <Button variant="outline" className="flex items-center gap-2" asChild>
    <button
      type="button"
      onClick={() => window.history.back()}
      className="flex items-center text-sm text-gray-600 hover:text-black"
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Cancel
    </button></Button>
  )
}
