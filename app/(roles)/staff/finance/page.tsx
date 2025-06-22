"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, CreditCard, Users, Download, Search, CheckCircle, Clock } from "lucide-react"

export default function FinanceDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const financeStats = [
    { title: "Total Revenue", value: "$45,231", change: "+12% from last month", icon: DollarSign },
    { title: "Commission Paid", value: "$6,784", change: "15% of revenue", icon: Users },
    { title: "Pending Payments", value: "$2,156", change: "8 transactions", icon: Clock },
    { title: "Monthly Growth", value: "+18%", change: "Above target", icon: TrendingUp },
  ]

  const commissionPayments = [
    {
      id: 1,
      agent: "Sarah Johnson",
      type: "CX Commission",
      amount: "$245",
      status: "paid",
      date: "2024-01-15",
      client: "TechStart Solutions",
    },
    {
      id: 2,
      agent: "Michael Chen",
      type: "Agent Commission",
      amount: "$1,200",
      status: "pending",
      date: "2024-01-14",
      client: "Fashion Forward",
    },
    {
      id: 3,
      agent: "Emily Rodriguez",
      type: "CX Commission",
      amount: "$180",
      status: "paid",
      date: "2024-01-13",
      client: "Local Eats",
    },
    {
      id: 4,
      agent: "David Kim",
      type: "Agent Commission",
      amount: "$890",
      status: "processing",
      date: "2024-01-12",
      client: "Green Energy Co",
    },
  ]

  const revenueBreakdown = [
    { service: "Social Media Audits", revenue: "$12,450", percentage: "28%", count: "83 services" },
    { service: "Business Plan Development", revenue: "$9,980", percentage: "22%", count: "20 services" },
    { service: "Marketing Strategy", revenue: "$8,760", percentage: "19%", count: "12 services" },
    { service: "Website Development", revenue: "$7,890", percentage: "17%", count: "9 services" },
    { service: "Other Services", revenue: "$6,151", percentage: "14%", count: "Various" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FN</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">Finance Dashboard</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Finance Manager
          </Badge>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Financial Management</h1>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">Process Payments</Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {financeStats.map((stat, index) => (
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
              <TabsTrigger value="commissions">Commissions</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
              <TabsTrigger value="payments">Payment Processing</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
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
                    <CardTitle>Commission Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Total Paid This Month</span>
                        <span className="font-medium">$6,784</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Pending Payments</span>
                        <span className="font-medium text-orange-600">$2,156</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Average Commission Rate</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between font-medium">
                          <span>Active Agents</span>
                          <span>23</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="commissions" className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search commissions..." className="pl-8" />
                </div>
                <Select>
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
                          <th className="text-left p-4">Amount</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Date</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {commissionPayments.map((payment) => (
                          <tr key={payment.id} className="border-b">
                            <td className="p-4 font-medium">{payment.agent}</td>
                            <td className="p-4">{payment.type}</td>
                            <td className="p-4">{payment.client}</td>
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

            <TabsContent value="revenue" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Service Type</CardTitle>
                  <CardDescription>Breakdown of revenue sources for current month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueBreakdown.map((item, index) => (
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

            <TabsContent value="payments" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Bulk Payment Processing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Pending Commission Payments</span>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700">
                        8 payments
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Amount</span>
                      <span className="font-medium">$2,156</span>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Process All Payments
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Bank Transfer</span>
                      <span className="text-sm text-gray-600">Primary method</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>PayPal</span>
                      <span className="text-sm text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cryptocurrency</span>
                      <span className="text-sm text-gray-600">Beta</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Configure Methods
                    </Button>
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
