"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, Search, MessageSquare, ThumbsUp } from "lucide-react"
import { mockForumPosts } from "@/lib/mock-data"

export default function ForumPage() {
  const [posts, setPosts] = useState(mockForumPosts)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || post.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

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
          <Link href="/get-help">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Private Help</Button>
          </Link>
          <Link href="/forum/new">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Community Forum</h1>
              <p className="text-gray-600">Share general business advice and learn from the community</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Forum Guidelines</h3>
            <p className="text-sm text-blue-800">
              This is a public forum for general business discussions. For private, confidential business issues, please
              use our{" "}
              <Link href="/get-help" className="underline font-medium">
                private consultation service
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search discussions..."
                className="pl-8 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="strategy">Strategy</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Card key={post.id} className="border-gray-200 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {post.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{post.author.name}</p>
                          <p className="text-sm text-gray-600">{post.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {post.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/forum/${post.id}`} className="hover:underline">
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">{post.title}</h3>
                    </Link>
                    <p className="text-gray-600 line-clamp-3">{post.content}</p>
                  </CardContent>
                  <div className="px-6 pb-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <MessageSquare className="mr-1 h-4 w-4 text-blue-600" />
                      {post.replies} replies
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ThumbsUp className="mr-1 h-4 w-4 text-blue-600" />
                      {post.likes} likes
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">No discussions found</h3>
                <p className="text-sm text-gray-600 mt-1">Try adjusting your search or filters</p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/forum/new">Start a new discussion</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
