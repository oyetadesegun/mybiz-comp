"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode, useTransition, useState } from "react"
import Link from "next/link"
import { z } from "zod"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import InputField from "@/components/form/InputField"
import RequiredLabel from "@/components/global/RequiredLabel"

// Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
})

type LoginFormType = z.infer<typeof loginSchema>

export default function LoginForm(
  { children,
    customError,
    formData
  }:
    {
      children: ReactNode,
      customError?: string,
      formData: LoginFormType

    }) {
  const [isPending, startTransition] = useTransition()

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: formData
  })

  const onSubmit = async (data: LoginFormType) => {

    startTransition(() => {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        // callbackUrl: "/dashboard", // optional
      })
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-br from-white to-[#F7F5FF]">
      <Card className="w-full max-w-[600px] border-[#E2E8F0] shadow-lg">
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

        {/* Error Message Display */}
        {customError && (
          <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600 text-center">{customError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <RequiredLabel>Email</RequiredLabel>
              <InputField
                fieldName="email"
                register={register}
                error={errors.email?.message}
                labelText="Email"
                type="email"
              />
            </div>

            <div>
              <RequiredLabel>Password</RequiredLabel>
              <InputField
                fieldName="password"
                register={register}
                error={errors.password?.message}
                labelText="Password"
                type={showPassword ? "text" : "password"}
                onPasswordToggle={() => setShowPassword((prev => !prev))}
                showPasswordToggle
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-[#7E69AB] hover:bg-[#6A5A91] text-white transition-colors"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
        {children}

        <div className="text-center text-sm text-[#4A5568] my-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth?mode=signup" className="text-[#7E69AB] hover:underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  )
}