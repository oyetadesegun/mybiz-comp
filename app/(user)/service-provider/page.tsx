"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Bell, CheckCircle, FileText, Star, Upload } from "lucide-react"

export default function ServiceProviderDashboard() {
  const [activeTab, setActiveTab] = useState("tasks")

  const assignedTasks = [
    {
      id: 1,
      service: "Social Media Audit",
      client: "Sarah Johnson",
      business: "Fashion Boutique",
      assignedDate: "2 days ago",
      deadline: "3 days",
      status: "in-progress",
      description: "Complete Instagram and Facebook audit with recommendations",
      priority: "high"
    },
    {
      id: 2,
      service: "Business Plan Development",
      client: "Michael Chen",
      business: "Tech Startup",
      assignedDate: "1 day ago",
      deadline: "1 week",
      status: "new",
      description: "Develop comprehensive business plan with financial projections",
      priority: "medium"
    },
    {
      id: 3,
      service: "Marketing Strategy",
      client: "Emily Rodriguez",
      business: "Restaurant Chain",
      assignedDate: "5 days ago",
      deadline: "2 days",
      status: "review",
      description: "Create digital marketing strategy for expansion",
      priority: "high"
    }
  ]

  const completedTasks = [
    {
      id: 4,
      service: "Website Development",
      client: "David Kim",
      business: "Consulting Firm",
      completedDate: "1 week ago",
      rating: 5,
      feedback: "Excellent work! The website exceeded our expectations."
    },
    {
      id: 5,
      service: "Social Media Audit",
      client: "Lisa Wang",
      business: "E-commerce Store",
      completedDate: "2 weeks ago",
      rating: 4,
      feedback: "Very thorough analysis with actionable recommendations."
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SP</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">Service Provider</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
            Expert Provider
          </Badge>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Provider" />
            <AvatarFallback>SP</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-gray-200 bg-white lg:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <button
                  onClick={() => setActiveTab("tasks")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "tasks"
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Assigned Tasks
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "completed"
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  <CheckCircle className="h-4 w-4" />
                  Completed Work
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "profile"
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  <Star className="h-4 w-4" />
                  My Profile
                </button>
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mx-auto max-w-6xl space-y-6">
            {activeTab === "tasks" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Assigned Tasks</h1>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">
                    {assignedTasks.filter(t => t.status !== "completed").length} Active Tasks
                  </Badge>
                </div>

                <div className="grid gap-4">
                  {assignedTasks.map((task) => (
                    <Card key={task.id} className="border-l-4 border-l-indigo-500">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{task.service}</CardTitle>
                            <CardDescription>
                              Client: {task.client} • Business: {task.business}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                task.priority === "high" ? "bg-red-50 text-red-700" :
                                task.priority === "medium" ? "bg-orange-50 text-orange-700" :
                                "bg-green-50 text-green-700"
                              }
                            >
                              {task.priority} priority
                            </Badge>
                            <Badge
                              variant={task.status === "new" ? "destructive" : 
                                      task.status === "completed" ? "default" : "secondary"}
                              className={
                                task.status === "new" ? "bg-blue-100 text-blue-800" :
                                task.status === "in-progress" ? "bg-orange-100 text-orange-800" :
                                task.status === "review" ? "bg-purple-100 text-purple-800" :
                                "bg-green-100 text-green-800"
                              }
                            >
                              {task.status.replace("-", " ")}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600">{task.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Assigned: {task.assignedDate}</span>
                          <span className="text-gray-500">Deadline: {task.deadline}</span>
                        </div>
                        
                        {task.status === "new" && (
                          <div className="flex gap-2">
                            <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                              Accept Task
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Request Clarification
                            </Button>
                          </div>
                        )}
                        
                        {task.status === "in-progress" && (
                          <div className="space-y-3">
                            <Textarea placeholder="Add progress update..." />
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Upload className="mr-2 h-3 w-3" />
                                Upload Files
                              </Button>
                              <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                                Update Progress
                              </Button>
                              <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                                Mark Complete
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {task.status === "review" && (
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <p className="text-purple-800 font-medium mb-2">Under Review</p>
                            <p className="text-purple-700 text-sm">
                              Your work is being reviewed by the client. You'll be notified of any feedback or approval.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {activeTab === "completed" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Completed Work</h1>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {completedTasks.length} Completed
                  </Badge>
                </div>

                <div className="grid gap-4">
                  {completedTasks.map((task) => (
                    <Card key={task.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{task.service}</CardTitle>
                            <CardDescription>
                              Client: {task.client} • Business: {task.business}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < task.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Client Feedback:</p>
                            <p className="text-gray-600 italic">"{task.feedback}"</p>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Completed: {task.completedDate}</span>
                            <span>Rating: {task.rating}/5 stars</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {activeTab === "profile" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Profile</h1>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Edit Profile
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Provider" />
                          <AvatarFallback>SP</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">Maria Garcia</h3>
                          <p className="text-sm text-gray-600">Social Media & Marketing Expert</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm ml-1">4.9 (127 reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Specializations:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="outline">Social Media Marketing</Badge>
                          <Badge variant="outline">Content Strategy</Badge>
                          <Badge variant="outline">Brand Development</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Completed Projects</span>
                        <span className="font-medium">127</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Average Rating</span>
                        <span className="font-medium">4.9/5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>On-time Delivery</span>
                        <span className="font-medium">98%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Response Time</span>
                        <span className="font-medium\">  less than 2 hours</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
