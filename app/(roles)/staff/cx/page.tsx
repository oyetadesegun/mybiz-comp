"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, MessageSquare, Calendar, DollarSign, Search, Plus } from "lucide-react"
import { mockCXRequests, mockCXStats } from "@/lib/cx-mock-data"

export default function CXDashboard() {
  const [activeTab, setActiveTab] = useState("requests")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState(null)

  /**
   * Same defensive logic for CX requests.
   */
  const filteredRequests = mockCXRequests.filter((request) => {
    const query = (searchTerm ?? "").toLowerCase()

    const clientName = (request.clientName ?? "").toLowerCase()
    const businessName = (request.businessName ?? "").toLowerCase()

    const matchesSearch = clientName.includes(query) || businessName.includes(query)
    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CX</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">Customer Experience</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            CX Representative
          </Badge>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="CX Rep" />
            <AvatarFallback>CX</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-gray-200 bg-white lg:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <button
                  onClick={() => setActiveTab("requests")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "requests"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  Client Requests
                </button>
                <button
                  onClick={() => setActiveTab("follow-ups")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "follow-ups"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Phone className="h-4 w-4" />
                  Follow-ups
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "bookings"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  Service Bookings
                </button>
                <button
                  onClick={() => setActiveTab("commissions")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "commissions"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                  My Commissions
                </button>
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mx-auto max-w-7xl space-y-6">
            {activeTab === "requests" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Client Requests</h1>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  {mockCXStats.map((stat, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.change}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search requests..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4">
                  {filteredRequests.map((request) => (
                    <Card
                      key={request.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedRequest(request)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{request.clientName}</CardTitle>
                            <CardDescription>
                              {request.businessName} • {request.businessType}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                request.status === "new"
                                  ? "destructive"
                                  : request.status === "completed"
                                    ? "default"
                                    : "secondary"
                              }
                              className={
                                request.status === "new"
                                  ? "bg-red-100 text-red-800"
                                  : request.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-orange-100 text-orange-800"
                              }
                            >
                              {request.status.replace("-", " ")}
                            </Badge>
                            <Badge variant="outline" className={request.urgencyColor}>
                              {request.urgency}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{request.title}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Category: {request.category}</span>
                          <span>Submitted: {request.submittedDate}</span>
                        </div>
                        {request.lastContact && (
                          <div className="mt-2 text-sm text-blue-600">Last contact: {request.lastContact}</div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {activeTab === "follow-ups" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Client Follow-ups</h1>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Follow-up
                  </Button>
                </div>

                <div className="grid gap-4">
                  {mockCXRequests
                    .filter((r) => r.status !== "new")
                    .map((request) => (
                      <Card key={request.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">{request.clientName}</CardTitle>
                              <CardDescription>{request.businessName}</CardDescription>
                            </div>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              <Phone className="mr-2 h-3 w-3" />
                              Call Now
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Follow-up Notes:</p>
                            <Textarea placeholder="Add your follow-up notes here..." className="min-h-[80px]" />
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              Save Notes
                            </Button>
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                              Mark Complete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </>
            )}

            {activeTab === "bookings" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Service Bookings</h1>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Book Service
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Book Service for Client</CardTitle>
                    <CardDescription>Select a client and service to book on their behalf</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Client</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select client" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockCXRequests.map((request) => (
                              <SelectItem key={request.id} value={request.id}>
                                {request.clientName} - {request.businessName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Service</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="social-media-audit">Social Media Audit - $150</SelectItem>
                            <SelectItem value="business-plan">Business Plan Development - $499</SelectItem>
                            <SelectItem value="marketing-strategy">Marketing Strategy - $699</SelectItem>
                            <SelectItem value="website-development">Website Development - $899</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Service Provider</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Assign service provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="provider1">Maria Garcia - Social Media Expert</SelectItem>
                          <SelectItem value="provider2">James Wilson - Business Consultant</SelectItem>
                          <SelectItem value="provider3">Sarah Kim - Marketing Specialist</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Notes</label>
                      <Textarea placeholder="Add any special instructions or notes..." />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Book Service & Notify Provider
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "commissions" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Commissions</h1>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$1,245</div>
                      <p className="text-xs text-muted-foreground">From 8 bookings</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$8,950</div>
                      <p className="text-xs text-muted-foreground">All time</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$325</div>
                      <p className="text-xs text-muted-foreground">2 services in progress</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Commission History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          client: "Sarah Johnson",
                          service: "Social Media Audit",
                          amount: "$22.50",
                          status: "paid",
                          date: "2 days ago",
                        },
                        {
                          client: "Michael Chen",
                          service: "Business Plan",
                          amount: "$74.85",
                          status: "paid",
                          date: "1 week ago",
                        },
                        {
                          client: "Emily Rodriguez",
                          service: "Marketing Strategy",
                          amount: "$104.85",
                          status: "pending",
                          date: "3 days ago",
                        },
                      ].map((commission, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{commission.client}</p>
                            <p className="text-sm text-gray-600">{commission.service}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{commission.amount}</p>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={commission.status === "paid" ? "default" : "secondary"}
                                className={
                                  commission.status === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-orange-100 text-orange-800"
                                }
                              >
                                {commission.status}
                              </Badge>
                              <span className="text-xs text-gray-500">{commission.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedRequest.clientName}</CardTitle>
                  <CardDescription>
                    {selectedRequest.businessName} • {selectedRequest.businessType}
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Request Details</h4>
                <p className="text-gray-600">{selectedRequest.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-gray-600">{selectedRequest.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Urgency</p>
                  <Badge variant="outline" className={selectedRequest.urgencyColor}>
                    {selectedRequest.urgency}
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <p className="text-sm text-gray-600">Phone: {selectedRequest.phone}</p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Client
                </Button>
                <Button variant="outline" className="flex-1">
                  Book Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
