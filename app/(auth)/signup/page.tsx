import { redirect } from 'next/navigation'
import React from 'react'

export default function SignUp() {
  redirect("/auth?mode=signup")
}
