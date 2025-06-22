'use client'

import React, { useState } from 'react'
import { CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import Link from "next/link"


export default function LoginForm() {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login - in a real app, this would authenticate with a backend
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#2D3748]">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="border-[#E2E8F0] focus:border-[#7E69AB] focus:ring-[#7E69AB]"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-[#2D3748]">
              Password
            </Label>
            <Link href="/forgot-password" className="text-sm text-[#7E69AB] hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="border-[#E2E8F0] focus:border-[#7E69AB] focus:ring-[#7E69AB]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          type="submit"
          className="w-full bg-[#7E69AB] hover:bg-[#6A5A91] text-white transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </CardFooter>
    </form>
  )
}
