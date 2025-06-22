"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  CreditCard,
  Users,
  Download,
  Search,
  CheckCircle,
  FileText,
  BarChart,
  PieChart,
  Calculator,
} from "lucide-react"
import {
  mockFinanceStats,
  mockCommissionPayments,
  mockRevenueBreakdown,
  mockFinancialReports,
} from "@/lib/finance-mock-data"

export default function FinanceDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayments = mockCommissionPayments.filter((payment) => {
    const query = (searchTerm ?? "").toLowerCase()
    const agent = (payment.agent ?? "").toLowerCase()
    const client = (payment.client ?? "").toLowerCase()
    const matchesSearch = agent.includes(query) || client.includes(query)
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FN</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">Finance Management</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Finance Manager
          </Badge>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-gray-200 bg-white lg:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "overview"
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <BarChart className="h-4 w-4" />
                  Financial Overview
                </button>
                <button
                  onClick={() => setActiveTab("reports")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "reports"
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Financial Reports
                </button>
                <button
                  onClick={() => setActiveTab("invoices")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "invoices"
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Invoice Management
                </button>
                <button
                  onClick={() => setActiveTab("payments")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "payments"
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  Payment Processing
                </button>
                <button
                  onClick={() => setActiveTab("commissions")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "commissions"
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Commission Tracking
                </button>
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Finance Dashboard</h1>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Calculator className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {mockFinanceStats.map((stat, index) => (
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
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="commissions">Commissions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Trends</CardTitle>
                      <CardDescription>Monthly revenue performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>January 2024</span>
                          <span className="font-medium">$45,231</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>December 2023</span>
                          <span className="font-medium">$40,356</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>November 2023</span>
                          <span className="font-medium">$38,742</span>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex items-center justify-between font-medium">
                            <span>Growth Rate</span>
                            <span className="text-green-600">+12%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Breakdown</CardTitle>
                      <CardDescription>Current month expenses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Commission Payments</span>
                          <span className="font-medium">$6,784</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Operational Costs</span>
                          <span className="font-medium">$3,200</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Marketing</span>
                          <span className="font-medium">$2,100</span>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex items-center justify-between font-medium">
                            <span>Total Expenses</span>
                            <span>$12,084</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Service Type</CardTitle>
                    <CardDescription>Performance breakdown by service category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRevenueBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{item.service}</p>
                            <p className="text-sm text-gray-600">{item.count}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{item.revenue}</p>
                            <p className="text-sm text-gray-600">{item.percentage} of total</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Generate Financial Reports</CardTitle>
                      <CardDescription>Create comprehensive financial reports</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <BarChart className="mr-2 h-4 w-4" />
                        Monthly Revenue Report
                      </Button>
                      <Button variant="outline" className="w-full">
                        <PieChart className="mr-2 h-4 w-4" />
                        Expense Analysis Report
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        Commission Summary Report
                      </Button>
                      <Button variant="outline" className="w-full">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Profitability Analysis
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Reports</CardTitle>
                      <CardDescription>Previously generated financial reports</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {mockFinancialReports.map((report, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <p className="text-sm text-gray-600">Generated {report.date}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="mr-1 h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="commissions" className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search commissions..."
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
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b">
                          <tr>
                            <th className="text-left p-4">Agent</th>
                            <th className="text-left p-4">Type</th>
                            <th className="text-left p-4">Client</th>
                            <th className="text-left p-4">Service Value</th>
                            <th className="text-left p-4">Commission</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Date</th>
                            <th className="text-left p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPayments.map((payment) => (
                            <tr key={payment.id} className="border-b">
                              <td className="p-4 font-medium">{payment.agent}</td>
                              <td className="p-4">{payment.type}</td>
                              <td className="p-4">{payment.client}</td>
                              <td className="p-4 font-medium">{payment.serviceValue}</td>
                              <td className="p-4 font-medium">{payment.amount}</td>
                              <td className="p-4">
                                <Badge
                                  variant={payment.status === "paid" ? "default" : "secondary"}
                                  className={
                                    payment.status === "paid"
                                      ? "bg-green-100 text-green-800"
                                      : payment.status === "pending"
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-blue-100 text-blue-800"
                                  }
                                >
                                  {payment.status}
                                </Badge>
                              </td>
                              <td className="p-4 text-sm text-gray-500">{payment.date}</td>
                              <td className="p-4">
                                {payment.status === "pending" && (
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                    <CheckCircle className="mr-1 h-3 w-3" />
                                    Pay
                                  </Button>
                                )}
                                {payment.status === "paid" && (
                                  <Button size="sm" variant="outline">
                                    <Download className="mr-1 h-3 w-3" />
                                    Receipt
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
