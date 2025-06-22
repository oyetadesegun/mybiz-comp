"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

export default function AskQuestionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isPublic, setIsPublic] = useState(true)
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate posting question - in a real app, this would send to a backend
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-[#F7F5FF]">
        <div className="mx-auto max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-[#4A5568] hover:text-[#7E69AB] hover:bg-white/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card className="border-[#E2E8F0] shadow-md">
            <CardHeader>
              <CardTitle className="text-[#2D3748]">Ask a Question</CardTitle>
              <CardDescription className="text-[#4A5568]">
                Share your business challenge and get advice from experts and peers
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#2D3748]">
                    Question Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="E.g., How do I improve cash flow in my small business?"
                    required
                    className="border-[#E2E8F0] focus:border-[#7E69AB] focus:ring-[#7E69AB]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-[#2D3748]">
                    Category
                  </Label>
                  <Select required>
                    <SelectTrigger
                      id="category"
                      className="border-[#E2E8F0] focus:border-[#7E69AB] focus:ring-[#7E69AB]"
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance & Accounting</SelectItem>
                      <SelectItem value="marketing">Marketing & Sales</SelectItem>
                      <SelectItem value="operations">Operations & Management</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="legal">Legal & Compliance</SelectItem>
                      <SelectItem value="technology">Technology & IT</SelectItem>
                      <SelectItem value="strategy">Strategy & Growth</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details" className="text-[#2D3748]">
                    Question Details
                  </Label>
                  <Textarea
                    id="details"
                    placeholder="Provide as much detail as possible about your situation and what you're looking for help with..."
                    className="min-h-[200px] border-[#E2E8F0] focus:border-[#7E69AB] focus:ring-[#7E69AB]"
                    required
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="public-question" className="text-[#2D3748]">
                        Make question public
                      </Label>
                      <p className="text-sm text-[#4A5568]">Public questions can be viewed and answered by all users</p>
                    </div>
                    <Switch
                      id="public-question"
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                      className="data-[state=checked]:bg-[#7E69AB]"
                    />
                  </div>
                  {isPublic && (
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="anonymous" className="text-[#2D3748]">
                          Post anonymously
                        </Label>
                        <p className="text-sm text-[#4A5568]">Your name and company won't be visible to others</p>
                      </div>
                      <Switch
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={setIsAnonymous}
                        className="data-[state=checked]:bg-[#7E69AB]"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-[#7E69AB] hover:bg-[#6A5A91] text-white transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Posting question..." : "Post Question"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
