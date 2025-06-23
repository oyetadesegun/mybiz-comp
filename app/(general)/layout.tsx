import DashboardHeader from '@/components/dashboard-header'
import React, { ReactNode } from 'react'

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen'>
      <DashboardHeader />
      <div className="mt-2">
        {children}
      </div>
    </div>
  )
}
