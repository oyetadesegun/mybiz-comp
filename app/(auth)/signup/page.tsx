"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup - in a real app, this would register with a backend
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-br from-white to-[#F7F5FF]">
      <Card className="w-full max-w-md border-[#E2E8F0] shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-[#7E69AB]"
              >
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                <path d="M19 11h2m-1 -1v2" />
              </svg>
              <span className="ml-2 text-xl font-bold text-[#2D3748]">AdviceHive</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-[#2D3748]">Create an account</CardTitle>
          <CardDescription className="text-center text-[#4A5568]">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-[#2D3748]">
                  First name
                </Label>
                <Input
                  id="first-name"
                  required
                  className="border-[#E2E8F0] focus:border-[#7E69AB] focus:ring-[#7E69AB]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-[#2D3748]">
                  Last name
                </Label>
                <Input
                  id="last-name"
                  required
                  className="border-[#E2E8F0] focus:border-[#7E69AB] focus:ring-[#7E69AB]"
                />
              </div>
            </div>
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
              <Label htmlFor="password" className="text-[#2D3748]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                className="border-[#E2E8F0] focus:border-[#7E69AB] focus:ring-[#7E69AB]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-[#2D3748]">
                Company (optional)
              </Label>
              <Input id="company" className="border-[#E2E8F0] focus:border-[#7E69AB] focus:ring-[#7E69AB]" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                required
                className="border-[#7E69AB] data-[state=checked]:bg-[#7E69AB] data-[state=checked]:text-white"
              />
              <Label htmlFor="terms" className="text-sm text-[#4A5568]">
                I agree to the{" "}
                <Link href="/terms" className="text-[#7E69AB] hover:underline">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#7E69AB] hover:underline">
                  privacy policy
                </Link>
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full bg-[#7E69AB] hover:bg-[#6A5A91] text-white transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            <div className="mt-4 text-center text-sm text-[#4A5568]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#7E69AB] hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
