
import type React from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import SignIn from "@/components/SignIn"
import Link from "next/link"
import LoginForm from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-br from-white to-[#F7F5FF]">
      <Card className="w-full max-w-md border-[#E2E8F0] shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MB</span>
              </div>
              <span className="ml-2 text-xl font-bold text-[#2D3748]">MyBiz.Com</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-[#2D3748]">Welcome back</CardTitle>
          <CardDescription className="text-center text-[#4A5568]">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <LoginForm />
        <SignIn />
        <div className="mt-4 text-center text-sm text-[#4A5568]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#7E69AB] hover:underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  )
}
