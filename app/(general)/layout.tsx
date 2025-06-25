'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ReactNode } from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const cancelHeaderPaths = ['/forum/new'] // you can extend this array as needed

export default function GeneralLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const showCancelHeader = cancelHeaderPaths.includes(pathname)

  const CommonLogo = () => (
    <Link href="/" className="flex items-center">
      <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">MB</span>
      </div>
      <span className="ml-2 text-xl font-bold text-gray-900">MyBiz.Com</span>
    </Link>
  )

  const CancelHeader = () => (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
      <CommonLogo />
      <div className="ml-auto flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-gray-600 hover:text-blue-600"
        >
          Cancel
        </Button>
      </div>
    </header>
  )

  const DefaultHeader = () => (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
      <CommonLogo />
      <div className="ml-auto flex items-center gap-4">
        <Link href="/get-help">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Private Help</Button>
        </Link>
        <Link href="/forum/new">
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>
    </header>
  )

  return (
    <div className="min-h-screen">
      {showCancelHeader ? <CancelHeader /> : <DefaultHeader />}
      <div className="mt-2">{children}</div>
    </div>
  )
}
