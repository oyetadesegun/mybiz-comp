"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Info, MessageSquare, Send, Users, Video } from "lucide-react"
import { mockGroups, mockGroupMessages } from "@/lib/mock-data"
import DashboardHeader from "@/components/dashboard-header"

export default function GroupPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState(mockGroupMessages)
  const [newMessage, setNewMessage] = useState("")

  // In a real app, you would fetch the group by ID from your database
  const group = mockGroups.find((g) => g.id === params.id) || mockGroups[0]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      timestamp: "Just now",
      author: {
        id: "current-user",
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 dark:bg-gray-900 lg:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <span>Questions</span>
                </Link>
                <Link
                  href="/groups"
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                >
                  <span>Groups</span>
                </Link>
                <Link
                  href="/meetings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <span>Meetings</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <span>Profile</span>
                </Link>
              </nav>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-hidden">
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{group.name}</h1>
                  {group.isPrivate && <Badge variant="outline">Private</Badge>}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/groups/${params.id}/members`}>
                      <Users className="mr-2 h-4 w-4" />
                      Members
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/groups/${params.id}/schedule`}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/meetings/new?groupId=${params.id}`}>
                      <Video className="mr-2 h-4 w-4" />
                      Start Meeting
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
            </div>

            <Tabs defaultValue="chat" className="flex-1 overflow-hidden">
              <div className="border-b px-4">
                <TabsList>
                  <TabsTrigger value="chat">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="about">
                    <Info className="mr-2 h-4 w-4" />
                    About
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="chat"
                className="flex-1 overflow-hidden p-0 data-[state=active]:flex data-[state=active]:flex-col"
              >
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.author.avatar || "/placeholder.svg"} alt={message.author.name} />
                          <AvatarFallback>{message.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{message.author.name}</span>
                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="about" className="p-4 data-[state=active]:block">
                <Card>
                  <CardHeader>
                    <CardTitle>About this group</CardTitle>
                    <CardDescription>Group information and details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium">Description</h3>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium">Members ({group.memberCount})</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.recentMembers.map((member, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{member.name}</span>
                          </div>
                        ))}
                        {group.memberCount > group.recentMembers.length && (
                          <Button variant="link" size="sm" asChild>
                            <Link href={`/groups/${params.id}/members`}>View all members</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium">Created</h3>
                      <p className="text-sm text-muted-foreground">June 12, 2023</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
