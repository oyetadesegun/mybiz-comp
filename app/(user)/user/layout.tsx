import Link from 'next/link'
import React, { ReactNode } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import ProfileAvatar from '@/components/layout/ProfileAvatar'


export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="px-4 py-4 md:py-5 sticky top-0 w-full lg:px-6 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MB</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">MyBiz.Com</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/get-help">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Help</Button>
          </Link>
          <ProfileAvatar />
        </div>
      </header>
      <main className='bg-gray-50'>
        {children}
      </main>
    </div>
  )
}
