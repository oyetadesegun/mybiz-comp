"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search } from "lucide-react"
import QuestionCard from "@/components/question-card"
import { mockQuestions } from "@/lib/mock-data"

export default function ExplorePage() {
  const [questions, setQuestions] = useState(mockQuestions)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || question.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-[#F7F5FF]">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-[#2D3748]">Explore Questions</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#4A5568]" />
              <Input
                placeholder="Search questions..."
                className="pl-8 border-[#E2E8F0] focus:border-[#7E69AB] focus:ring-[#7E69AB]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] border-[#E2E8F0] focus:border-[#7E69AB] focus:ring-[#7E69AB]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="strategy">Strategy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => <QuestionCard key={question.id} question={question} />)
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-[#E2E8F0]">
                <h3 className="text-lg font-medium text-[#2D3748]">No questions found</h3>
                <p className="text-sm text-[#4A5568] mt-1">Try adjusting your search or filters</p>
                <Button className="mt-4 bg-[#7E69AB] hover:bg-[#6A5A91] text-white transition-colors" asChild>
                  <Link href="/dashboard/ask">Ask a new question</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
