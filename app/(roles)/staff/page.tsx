"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MessageSquare, DollarSign, CheckCircle, Clock, Star, Search } from "lucide-react"
import { mockLeads, mockClientIssues, mockSocialMediaEvaluations } from "@/lib/mock-data"

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("leads")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLeads = mockLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MB</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">MyBiz.Com Staff</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Customer Experience Team
          </Badge>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Staff" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-gray-200 bg-white lg:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <button
                  onClick={() => setActiveTab("leads")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "leads"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Phone className="h-4 w-4" />
                  New Leads
                </button>
                <button
                  onClick={() => setActiveTab("issues")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "issues"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  Client Issues
                </button>
                <button
                  onClick={() => setActiveTab("evaluations")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "evaluations"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Star className="h-4 w-4" />
                  Social Media Evaluations
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "billing"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                  Billing & Finance
                </button>
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mx-auto max-w-6xl space-y-6">
            {activeTab === "leads" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">New Leads</h1>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search leads..."
                        className="pl-8 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredLeads.map((lead) => (
                    <Card key={lead.id} className="border-gray-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{lead.name}</CardTitle>
                          <Badge
                            variant={lead.status === "contacted" ? "default" : "secondary"}
                            className={
                              lead.status === "contacted"
                                ? "bg-green-100 text-green-800"
                                : lead.status === "pending"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            {lead.status}
                          </Badge>
                        </div>
                        <CardDescription>
                          {lead.category} • Submitted {lead.submittedDate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Phone:</p>
                          <p className="text-sm text-gray-600">{lead.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Challenge:</p>
                          <p className="text-sm text-gray-600 line-clamp-3">{lead.challenge}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Urgency:</p>
                          <Badge variant="outline" className="text-xs">
                            {lead.urgency}
                          </Badge>
                        </div>
                        {lead.referralCode && (
                          <div>
                            <p className="text-sm font-medium text-gray-900">Referral Code:</p>
                            <p className="text-sm text-blue-600">{lead.referralCode}</p>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                            <Phone className="h-4 w-4 mr-1" />
                            Call Now
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Mark Contacted
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {activeTab === "issues" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Client Issues</h1>
                </div>

                <div className="space-y-4">
                  {mockClientIssues.map((issue) => (
                    <Card key={issue.id} className="border-gray-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{issue.clientName}</CardTitle>
                            <CardDescription>
                              {issue.category} • {issue.submittedDate}
                            </CardDescription>
                          </div>
                          <Badge
                            variant={
                              issue.status === "resolved"
                                ? "default"
                                : issue.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              issue.status === "resolved"
                                ? "bg-green-100 text-green-800"
                                : issue.status === "in-progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-orange-100 text-orange-800"
                            }
                          >
                            {issue.status.replace("-", " ")}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">Issue Description:</p>
                          <p className="text-sm text-gray-600">{issue.description}</p>
                        </div>
                        {issue.response ? (
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-sm font-medium text-blue-900 mb-2">Current Response:</p>
                            <p className="text-sm text-blue-800">{issue.response}</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-900">Add Response:</p>
                            <Textarea
                              placeholder="Enter your response to help this client..."
                              className="min-h-[100px]"
                            />
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Submit Response</Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {activeTab === "evaluations" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Social Media Evaluations</h1>
                </div>

                <div className="space-y-4">
                  {mockSocialMediaEvaluations.map((evaluation) => (
                    <Card key={evaluation.id} className="border-gray-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{evaluation.clientName}</CardTitle>
                            <CardDescription>
                              {evaluation.platform} • {evaluation.completedDate}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">Score: {evaluation.score}/10</Badge>
                            <Badge variant="outline">${evaluation.billingAmount}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">Evaluator Comments:</p>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-700">{evaluation.evaluatorComments}</p>
                            <p className="text-xs text-gray-500 mt-2">- {evaluation.evaluator}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">Key Findings:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {evaluation.findings.map((finding, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                {finding}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">Recommendations:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {evaluation.recommendations.map((rec, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {activeTab === "billing" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Billing & Finance</h1>
                </div>

                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$2,450</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-muted-foreground">$875 total</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Completed Services</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Billing Items</h3>
                  {mockSocialMediaEvaluations.map((evaluation) => (
                    <Card key={evaluation.id} className="border-gray-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{evaluation.clientName}</CardTitle>
                            <CardDescription>
                              {evaluation.platform} Evaluation • {evaluation.completedDate}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              ${evaluation.billingAmount}
                            </Badge>
                            <Badge
                              className={
                                evaluation.billingStatus === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }
                            >
                              {evaluation.billingStatus}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-gray-900 mb-1">Billing Notes:</p>
                          <p className="text-sm text-gray-600">{evaluation.evaluatorComments}</p>
                        </div>
                        {evaluation.billingStatus === "pending" && (
                          <div className="mt-4 flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              Mark as Paid
                            </Button>
                            <Button size="sm" variant="outline">
                              Send Invoice
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
