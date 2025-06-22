"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Share, Bookmark, Flag, ArrowLeft } from "lucide-react"
import { mockQuestions, mockResponses } from "@/lib/mock-data"
import ResponseCard from "@/components/response-card"

export default function QuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [responses, setResponses] = useState(mockResponses)

  // In a real app, you would fetch the question by ID from your database
  const question = mockQuestions.find((q) => q.id === params.id) || mockQuestions[0]

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate posting response - in a real app, this would send to a backend
    setTimeout(() => {
      setIsLoading(false)
      // Clear the form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white px-4 lg:px-6 h-16 flex items-center">
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
        <div className="ml-auto flex items-center gap-4">
          <Link href="/dashboard/ask">
            <Button className="bg-[#7E69AB] hover:bg-[#6A5A91] text-white transition-colors">Ask Question</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-[#F7F5FF]">
        <div className="mx-auto max-w-3xl space-y-6">
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
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl text-[#2D3748]">{question.title}</CardTitle>
                  <CardDescription className="text-[#4A5568]">
                    Posted {question.date} in{" "}
                    <Badge variant="outline" className="bg-[#F7F5FF] text-[#7E69AB] border-[#7E69AB]">
                      {question.category}
                    </Badge>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#E2E8F0] text-[#4A5568] hover:text-[#7E69AB] hover:border-[#7E69AB]"
                  >
                    <Bookmark className="h-4 w-4" />
                    <span className="sr-only">Save</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#E2E8F0] text-[#4A5568] hover:text-[#7E69AB] hover:border-[#7E69AB]"
                  >
                    <Share className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#E2E8F0] text-[#4A5568] hover:text-[#7E69AB] hover:border-[#7E69AB]"
                  >
                    <Flag className="h-4 w-4" />
                    <span className="sr-only">Report</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 border border-[#E2E8F0]">
                  <AvatarImage src={question.author.avatar || "/placeholder.svg"} alt={question.author.name} />
                  <AvatarFallback className="bg-[#7E69AB]/10 text-[#7E69AB]">
                    {question.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#2D3748]">
                      {question.isAnonymous ? "Anonymous" : question.author.name}
                    </span>
                    {question.author.company && !question.isAnonymous && (
                      <span className="text-sm text-[#4A5568]">• {question.author.company}</span>
                    )}
                  </div>
                  <div className="space-y-4">
                    <p className="text-[#4A5568]">{question.content}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[#2D3748]">{responses.length} Responses</h2>
            <Separator className="bg-[#E2E8F0]" />
          </div>

          {responses.map((response) => (
            <ResponseCard key={response.id} response={response} />
          ))}

          <Card className="border-[#E2E8F0] shadow-md">
            <CardHeader>
              <CardTitle className="text-[#2D3748]">Your Response</CardTitle>
              <CardDescription className="text-[#4A5568]">
                Share your expertise and help solve this business challenge
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitResponse}>
              <CardContent>
                <Textarea
                  placeholder="Share your advice, experience, or solution..."
                  className="min-h-[150px] border-[#E2E8F0] focus:border-[#7E69AB] focus:ring-[#7E69AB]"
                  required
                />
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-[#7E69AB] hover:bg-[#6A5A91] text-white transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Posting response..." : "Post Response"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
