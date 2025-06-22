"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"

export default function CreateGroupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate creating group - in a real app, this would send to a backend
    setTimeout(() => {
      setIsLoading(false)
      router.push("/groups")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Create a Group</CardTitle>
              <CardDescription>Create a new group for discussions and meetings</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Group Name</Label>
                  <Input id="name" placeholder="E.g., Startup Founders Network" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select required>
                    <SelectTrigger>
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this group is about and who should join..."
                    className="min-h-[100px]"
                    required
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="private-group">Private Group</Label>
                      <p className="text-sm text-muted-foreground">
                        Private groups are only visible to members and require approval to join
                      </p>
                    </div>
                    <Switch id="private-group" checked={isPrivate} onCheckedChange={setIsPrivate} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating group..." : "Create Group"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
