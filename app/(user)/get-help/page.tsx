"use client"

import type React from "react"
import { useActionState, useTransition } from 'react'
import { createNewHelpForm } from "@/actions/user/get-help"
import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import InputField from "@/components/form/InputField"
import SelectField from "@/components/form/SelectField"
import TextAreaInput from "@/components/form/TextAreaInput"
import MultiFileUpload, { UploadImperativeRef } from "@/components/form/MultiFileUpload" // labelText for your multi-upload component

import { ArrowLeft, Shield, Phone } from "lucide-react"
import RequiredLabel from "@/components/global/RequiredLabel"
import { helpFormSchema, HelpFormType } from "@/validations/get-help-validation"
import { ServerActionState } from "@/types/GenericTypes"
import { useFeedBackToast } from "@/hooks/useFeedBackToast"

const businessTypeOptions = [
  // A selection of business types for brevity
  { value: "law-firm", label: "Law Firm" },
  { value: "accounting-firm", label: "Accounting Firm" },
  { value: "business-consulting", label: "Business Consulting" },
  { value: "ecommerce-store", label: "E-commerce Store" },
  { value: "restaurant", label: "Restaurant" },
  { value: "saas-startup", label: "SaaS Startup" },
  { value: "digital-marketing", label: "Digital Marketing Agency" },
  { value: "poultry-farming", label: "Poultry Farming" },
  { value: "fashion-line", label: "Fashion/Clothing Line" },
  { value: "other", label: "Other (Please specify in description)" },
]

const categoryOptions = [
  { value: "marketing", label: "Marketing & Sales" },
  { value: "finance", label: "Finance & Cash Flow" },
  { value: "operations", label: "Operations & Management" },
  { value: "hr", label: "Human Resources" },
  { value: "technology", label: "Technology & Digital" },
  { value: "legal", label: "Legal & Compliance" },
  { value: "strategy", label: "Strategy & Growth" },
  { value: "social-media", label: "Social Media & Online Presence" },
  { value: "other", label: "Other" },
]

const urgencyOptions = [
  { value: "immediate", label: "Immediate - Need help today" },
  { value: "this-week", label: "This week" },
  { value: "this-month", label: "This month" },
  { value: "planning", label: "Planning for future" },
]

const fileUploadStatic = {
  title: "Upload Supporting Documents",
  maximumNumber: "Maximum 5 documents, 2MB each.",
  format: "Formats: PDF, DOCX, JPG, PNG",
}

export default function GetHelpPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const uploadRef = useRef<UploadImperativeRef>(null)

  const initialState = { errors: {} as ServerActionState<HelpFormType> }

  const [state, formAction, isPending] = useActionState(createNewHelpForm, initialState)

  useFeedBackToast(state)

  const {
    handleSubmit,
    trigger,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<HelpFormType>({
    resolver: zodResolver(helpFormSchema),
    mode: "onBlur",
  })

  const [isTransitionPending, transition] = useTransition()

  const handleServerSubmit = async (data: HelpFormType) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string)
      if (key === "documents") {
        formData.append("documents", JSON.stringify(value)) // must stringify array
      } else {
        formData.append(key, value as string)
      }
    })
    transition(() => {
      formAction(formData)
    })
  }

  // Watch the value for the file upload component and select fields
  const documents = watch("documents")
  const businessType = watch("businessType")
  const category = watch("category")
  const urgency = watch("urgency")

  const step1Fields: (keyof HelpFormType)[] = [
    "title",
    "businessName",
    "businessType",
    "businessChallenge",
    "category",
    "urgency",
  ]

  const handleNextStep = async () => {
    const isStep1Valid = await trigger(step1Fields)
    if (isStep1Valid) {
      setStep(2)
    }
  }



  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MB</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">MyBiz.Com</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="text-gray-600 hover:text-blue-600">
            Cancel
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="mx-auto max-w-[1100px]">
          <Button
            variant="ghost"
            onClick={() => (step === 1 ? router.back() : setStep(1))}
            className="mb-4 text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card className="border-gray-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle className="text-gray-900">
                    {step === 1 ? "Share Your Business Challenge" : "Let's Connect With You"}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {step === 1
                      ? "Tell us what you're dealing with - everything is kept completely confidential."
                      : "Provide your contact details so our team can help you personally."}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit(handleServerSubmit)}>
              <CardContent className="space-y-6">
                <div className={`${step !== 1 && "hidden"}`}>
                  <div>
                    <RequiredLabel>Title or Short Description</RequiredLabel>
                    <InputField
                      fieldName="title"
                      register={register}
                      error={errors.title?.message}
                      labelText="Enter a brief title"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <RequiredLabel>Business Name</RequiredLabel>
                      <InputField
                        fieldName="businessName"
                        register={register}
                        error={errors.businessName?.message}
                        labelText="Enter your business name"
                      />
                    </div>
                    <div>
                      <RequiredLabel>What is your business about?</RequiredLabel>
                      <SelectField
                        selectName="businessType"
                        setValue={setValue}
                        value={businessType as string}
                        error={errors.businessType?.message}
                        options={businessTypeOptions}
                        labelText="Select your business type"
                      />
                    </div>
                  </div>
                  <div>
                    <RequiredLabel>What business challenge are you facing?</RequiredLabel>
                    <TextAreaInput
                      fieldName="businessChallenge"
                      register={register}
                      error={errors.businessChallenge?.message}
                      labelText="Describe your situation in detail. The more information you provide, the better we can help you..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <RequiredLabel>Category</RequiredLabel>
                      <SelectField
                        selectName="category"
                        setValue={setValue}
                        value={category as string}
                        error={errors.category?.message}
                        options={categoryOptions}
                        labelText="Select the area you need help with"
                      />
                    </div>
                    <div>
                      <RequiredLabel>How urgent is this?</RequiredLabel>
                      <SelectField
                        selectName="urgency"
                        setValue={setValue}
                        value={urgency as string}
                        error={errors.urgency?.message}
                        options={urgencyOptions}
                        labelText="Select urgency level"
                      />
                    </div>
                  </div>
                </div>
                <div className={`${step === 1 && 'hidden'}`}>
                  <div>
                    <RequiredLabel>Your Full Name</RequiredLabel>
                    <InputField
                      fieldName="fullName"
                      register={register}
                      error={errors.fullName?.message}
                      labelText="Enter your full name"
                    />
                  </div>
                  <div>
                    <RequiredLabel>Business Address</RequiredLabel>
                    <InputField
                      fieldName="businessAddress"
                      register={register}
                      error={errors.businessAddress?.message}
                      labelText="Enter Business Address"
                    />
                  </div>
                  <div className="relative">
                    <RequiredLabel>
                      Phone Number
                      <span className="relative ml-1 top-[2px] text-xs bottom-2 text-gray-600">Our customer experience team will call you within 24 hours."</span>
                    </RequiredLabel>
                    <InputField
                      fieldName="phone"
                      register={register}
                      error={errors.phone?.message}
                      labelText="Enter your phone number"
                    />
                  </div>
                  <div className="relative">
                    <RequiredLabel>
                      How much are you willing to pay?
                      <span className="ml-1 relative top-[2px] text-xs bottom-2 text-gray-600">Provide a budget for the service you need."</span>
                    </RequiredLabel>
                    <InputField
                      fieldName="willingToPay"
                      register={register}
                      error={errors.willingToPay?.message}
                      labelText="e.g., 50,000"
                    />
                  </div>

                  <div className="space-y-2 pt-4">
                    <label className="text-sm font-medium text-gray-900">Social Media & Website (Optional)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        fieldName="websiteUrl"
                        register={register}
                        error={errors.websiteUrl?.message}
                        labelText="https://yourwebsite.com"
                      />
                      <InputField
                        fieldName="instagramUrl"
                        register={register}
                        error={errors.instagramUrl?.message}
                        labelText="https://instagram.com/yourprofile"
                      />
                      <InputField
                        fieldName="twitterUrl"
                        register={register}
                        error={errors.twitterUrl?.message}
                        labelText="https://twitter.com/yourprofile"
                      />
                      <InputField
                        fieldName="facebookUrl"
                        register={register}
                        error={errors.facebookUrl?.message}
                        labelText="https://facebook.com/yourprofile"
                      />
                    </div>
                  </div>

                  <MultiFileUpload
                    fieldName="documents"
                    setValue={setValue}
                    uploadTitle={fileUploadStatic.title}
                    uploadDescription={fileUploadStatic.maximumNumber}
                    extraContext={fileUploadStatic.format}
                    error={errors.documents?.message as string}
                    value={documents}
                    mediaType="all"
                    maxSizeInMegaByte={2}
                    maxDocuments={5}
                    uploadRef={uploadRef}
                  />
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900">What happens next?</h4>
                        <p className="text-sm text-blue-800 mt-1">
                          Our team will call you to understand your specific needs and help create your account.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                {step === 1 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-blue-600 h-12 mt-8 hover:bg-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 mt-4" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit & Get Help"}
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>

          {step === 1 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                🔒 Your information is completely confidential and will never be shared publicly.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}