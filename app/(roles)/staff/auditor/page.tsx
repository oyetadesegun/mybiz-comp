"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, FileText, AlertTriangle, DollarSign } from "lucide-react"

export default function AuditorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const auditStats = [
    { title: "Total Audits", value: "156", change: "+12 this month", icon: FileText },
    { title: "Compliance Issues", value: "3", change: "2 resolved", icon: AlertTriangle },
    { title: "Revenue Verified", value: "$45,231", change: "+8% accuracy", icon: DollarSign },
    { title: "Active Reviews", value: "8", change: "2 pending", icon: Eye },
  ]

  const recentAudits = [
    {
      id: 1,
      type: "Financial Review",
      client: "TechStart Solutions",
      status: "completed",
      findings: "Minor discrepancies in expense reporting",
      date: "2 days ago",
    },
    {
      id: 2,
      type: "Commission Audit",
      agent: "Sarah Johnson",
      status: "in-progress",
      findings: "Reviewing Q4 commission calculations",
      date: "1 day ago",
    },
    {
      id: 3,
      type: "Service Quality",
      provider: "Maria Garcia",
      status: "completed",
      findings: "Excellent service delivery standards",
      date: "3 days ago",
    },
    {
      id: 4,
      type: "Compliance Check",
      department: "CX Team",
      status: "pending",
      findings: "Routine quarterly review",
      date: "Today",
    },
  ]

  const complianceIssues = [
    {
      id: 1,
      severity: "high",
      issue: "Missing documentation for high-value transaction",
      department: "Finance",
      status: "open",
    },
    {
      id: 2,
      severity: "medium",
      issue: "Delayed commission payment processing",
      department: "HR",
      status: "in-progress",
    },
    { id: 3, severity: "low", issue: "Incomplete client feedback forms", department: "CX", status: "resolved" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AU</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">Auditor Dashboard</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            Senior Auditor
          </Badge>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Audit & Compliance Dashboard</h1>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <FileText className="mr-2 h-4 w-4" />
              New Audit
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {auditStats.map((stat, index) => (
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

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="audits">Recent Audits</TabsTrigger>
              <TabsTrigger value="compliance">Compliance Issues</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Pipeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Pending Reviews</span>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700">
                        8
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>In Progress</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        5
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Completed This Week</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        12
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Overall Compliance</span>
                      <Badge className="bg-green-100 text-green-800">98.5%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Open Issues</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700">
                        3
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Full Audit</span>
                      <span className="text-sm text-gray-600">15 days ago</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="audits" className="space-y-4">
              {recentAudits.map((audit) => (
                <Card key={audit.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{audit.type}</CardTitle>
                        <CardDescription>
                          {audit.client && `Client: ${audit.client}`}
                          {audit.agent && `Agent: ${audit.agent}`}
                          {audit.provider && `Provider: ${audit.provider}`}
                          {audit.department && `Department: ${audit.department}`}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          audit.status === "completed"
                            ? "default"
                            : audit.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          audit.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : audit.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                        }
                      >
                        {audit.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">{audit.findings}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{audit.date}</span>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-3 w-3" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              {complianceIssues.map((issue) => (
                <Card key={issue.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle
                          className={`h-5 w-5 ${
                            issue.severity === "high"
                              ? "text-red-500"
                              : issue.severity === "medium"
                                ? "text-orange-500"
                                : "text-yellow-500"
                          }`}
                        />
                        <div>
                          <CardTitle className="text-lg">{issue.issue}</CardTitle>
                          <CardDescription>Department: {issue.department}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            issue.severity === "high"
                              ? "bg-red-50 text-red-700"
                              : issue.severity === "medium"
                                ? "bg-orange-50 text-orange-700"
                                : "bg-yellow-50 text-yellow-700"
                          }
                        >
                          {issue.severity}
                        </Badge>
                        <Badge
                          variant={issue.status === "resolved" ? "default" : "secondary"}
                          className={
                            issue.status === "resolved"
                              ? "bg-green-100 text-green-800"
                              : issue.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {issue.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Investigate
                      </Button>
                      <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                        Take Action
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Generate Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Monthly Compliance Report
                    </Button>
                    <Button variant="outline" className="w-full">
                      Financial Audit Summary
                    </Button>
                    <Button variant="outline" className="w-full">
                      Commission Verification Report
                    </Button>
                    <Button variant="outline" className="w-full">
                      Service Quality Assessment
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Q4 Financial Review</p>
                        <p className="text-sm text-gray-600">Generated 3 days ago</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">Commission Audit Dec 2024</p>
                        <p className="text-sm text-gray-600">Generated 1 week ago</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
