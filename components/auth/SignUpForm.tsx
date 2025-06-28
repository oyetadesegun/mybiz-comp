"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode, useState } from "react"
import Link from "next/link"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import InputField from "@/components/form/InputField"
import { signIn } from "next-auth/react"
import RequiredLabel from "@/components/global/RequiredLabel"

// Schema
const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // set error on this field
  })

type SignupFormType = z.infer<typeof signupSchema>

export default function SignupForm(
  { children, formData, customError }: {
    children: ReactNode
    formData: SignupFormType,
    customError?: string
  }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: formData
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSubmit = async (data: SignupFormType) => {


    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-br from-white to-[#F7F5FF]">
      <Card className="w-full max-w-[600px] border-[#E2E8F0] shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center">
              <svg className="h-6 w-6 text-[#7E69AB]" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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

        {/* Error Message Display */}
        {customError && (
          <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600 text-center">{customError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="max-sm:col-span-2">
                <RequiredLabel>First name</RequiredLabel>
                <InputField
                  fieldName="firstName"
                  register={register}
                  error={errors.firstName?.message}
                  labelText="First name"
                />
              </div>
              <div className="max-sm:col-span-2">
                <RequiredLabel>Last name</RequiredLabel>
                <InputField
                  fieldName="lastName"
                  register={register}
                  error={errors.lastName?.message}
                  labelText="Last name"
                />
              </div>
            </div>

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

            <div>
              <RequiredLabel>Confirm Password</RequiredLabel>
              <InputField
                fieldName="confirmPassword"
                register={register}
                error={errors.confirmPassword?.message}
                labelText="Password"
                type={showConfirmPassword ? "text" : "password"}
                onPasswordToggle={() => setShowConfirmPassword((prev => !prev))}
                showPasswordToggle
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full bg-[#7E69AB] hover:bg-[#6A5A91] text-white transition-colors"
            >
              Create account
            </Button>
          </CardFooter>
        </form>
        {children}
        <div className="my-6 text-center text-sm text-[#4A5568]">
          Already have an account?{" "}
          <Link href="/auth" className="text-[#7E69AB] hover:underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  )
}