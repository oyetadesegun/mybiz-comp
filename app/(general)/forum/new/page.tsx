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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MessageSquare } from "lucide-react"

export default function NewForumPostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate posting - in a real app, this would send to backend
    setTimeout(() => {
      setIsLoading(false)
      router.push("/forum")
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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

      <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
        <div className="mx-auto max-w-2xl">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-gray-600 hover:text-blue-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Forum
          </Button>

          <Card className="border-gray-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle className="text-gray-900">Create New Discussion</CardTitle>
                  <CardDescription className="text-gray-600">
                    Share your business question or insight with the community
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Community Guidelines</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Keep discussions general and educational</li>
                    <li>
                      • For private business issues, use our{" "}
                      <Link href="/get-help" className="underline font-medium">
                        private consultation service
                      </Link>
                    </li>
                    <li>• Be respectful and constructive in your posts</li>
                    <li>• Search existing posts before creating new ones</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-900">
                    Discussion Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Best practices for small business inventory management?"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-600">Make it clear and descriptive to attract helpful responses</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-900">
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                    required
                  >
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing & Sales</SelectItem>
                      <SelectItem value="finance">Finance & Accounting</SelectItem>
                      <SelectItem value="operations">Operations & Management</SelectItem>
                      <SelectItem value="technology">Technology & Digital</SelectItem>
                      <SelectItem value="strategy">Strategy & Growth</SelectItem>
                      <SelectItem value="legal">Legal & Compliance</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="general">General Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-gray-900">
                    Description *
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Provide details about your question or share your insights. The more context you give, the better responses you'll receive..."
                    className="min-h-[200px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-600">
                    Share your experience, ask specific questions, or provide helpful tips for other business owners
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">🔒 Privacy Reminder</h4>
                  <p className="text-sm text-yellow-800">
                    This is a public forum. Don't share sensitive business information like financial details, customer
                    data, or proprietary strategies. For confidential matters, please use our{" "}
                    <Link href="/get-help" className="underline font-medium">
                      private consultation service
                    </Link>
                    .
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                  {isLoading ? "Publishing..." : "Publish Discussion"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need immediate help with a private business issue?{" "}
              <Link href="/get-help" className="text-blue-600 hover:underline font-medium">
                Get confidential consultation
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
