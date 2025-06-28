import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

export default async function AuthLayot({ children }: { children: ReactNode }) {
  const session = await auth()

  if (session) {
    if (session.user.role === "USER") {
      redirect("/user/dashboard")
    } else if (session.user.role === "ADMIN") {
      redirect("/admin/dashboard")
    }
  }

  return children
}
