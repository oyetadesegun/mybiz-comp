import SideBar from '@/components/layout/SideBar'
import { SignOut } from '@/components/SignOut'
import React, { ReactNode } from 'react'

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex'>
      <SideBar>
        <SignOut />
      </SideBar>
      <div className="mx-auto min-h-screen max-w-6xl pt-8">
        {children}
      </div>
    </div>
  )
}
