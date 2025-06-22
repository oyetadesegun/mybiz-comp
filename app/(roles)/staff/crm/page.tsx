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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Users,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  DollarSign,
  Search,
  Plus,
  CheckCircle,
  Edit,
  Eye,
} from "lucide-react"
import { mockCustomers, mockTickets, mockInvoices, mockCRMStats } from "@/lib/crm-mock-data"

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("customers")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false)

  const filteredCustomers = mockCustomers.filter((customer) => {
    const query = (searchTerm ?? "").toLowerCase()
    const name = (customer.name ?? "").toLowerCase()
    const company = (customer.company ?? "").toLowerCase()
    const matchesSearch = name.includes(query) || company.includes(query)
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredTickets = mockTickets.filter((ticket) => {
    const query = (searchTerm ?? "").toLowerCase()
    const title = (ticket.title ?? "").toLowerCase()
    const customer = (ticket.customer ?? "").toLowerCase()
    const matchesSearch = title.includes(query) || customer.includes(query)
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CRM</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">Customer Relationship Management</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            CX Manager
          </Badge>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="CX Manager" />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-64 border-r border-gray-200 bg-white lg:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <button
                  onClick={() => setActiveTab("customers")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "customers"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  Customer Profiles
                </button>
                <button
                  onClick={() => setActiveTab("tickets")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "tickets"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Ticket Management
                </button>
                <button
                  onClick={() => setActiveTab("communications")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "communications"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  Communication Log
                </button>
                <button
                  onClick={() => setActiveTab("invoices")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "invoices"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                  Invoice & Payments
                </button>
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">CRM Dashboard</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {mockCRMStats.map((stat, index) => (
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
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="communications">Communications</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
              </TabsList>

              <TabsContent value="customers" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search customers..."
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Customer
                  </Button>
                </div>

                <div className="grid gap-4">
                  {filteredCustomers.map((customer) => (
                    <Card key={customer.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                              <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{customer.name}</CardTitle>
                              <CardDescription>
                                {customer.company} • {customer.email}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                customer.status === "active"
                                  ? "bg-green-50 text-green-700"
                                  : customer.status === "inactive"
                                    ? "bg-gray-50 text-gray-700"
                                    : "bg-blue-50 text-blue-700"
                              }
                            >
                              {customer.status}
                            </Badge>
                            <Badge variant="outline">{customer.totalValue}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Phone</p>
                            <p className="font-medium">{customer.phone}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Last Contact</p>
                            <p className="font-medium">{customer.lastContact}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Services</p>
                            <p className="font-medium">{customer.servicesCount}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Satisfaction</p>
                            <p className="font-medium">{customer.satisfaction}/5</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Phone className="mr-2 h-3 w-3" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Mail className="mr-2 h-3 w-3" />
                            Email
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="mr-2 h-3 w-3" />
                            View Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tickets" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search tickets..."
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
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Dialog open={isCreateTicketOpen} onOpenChange={setIsCreateTicketOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Ticket
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Create Support Ticket</DialogTitle>
                        <DialogDescription>Create a new support ticket for customer assistance.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="customer" className="text-right">
                            Customer
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select customer" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockCustomers.map((customer) => (
                                <SelectItem key={customer.id} value={customer.id}>
                                  {customer.name} - {customer.company}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input id="title" placeholder="Ticket title" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="priority" className="text-right">
                            Priority
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="description" className="text-right mt-2">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Describe the issue..."
                            className="col-span-3 min-h-[100px]"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCreateTicketOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create Ticket</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-4">
                  {filteredTickets.map((ticket) => (
                    <Card key={ticket.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              #{ticket.id} - {ticket.title}
                            </CardTitle>
                            <CardDescription>Customer: {ticket.customer}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                ticket.priority === "urgent"
                                  ? "bg-red-50 text-red-700"
                                  : ticket.priority === "high"
                                    ? "bg-orange-50 text-orange-700"
                                    : ticket.priority === "medium"
                                      ? "bg-yellow-50 text-yellow-700"
                                      : "bg-green-50 text-green-700"
                              }
                            >
                              {ticket.priority}
                            </Badge>
                            <Badge
                              variant={ticket.status === "resolved" ? "default" : "secondary"}
                              className={
                                ticket.status === "open"
                                  ? "bg-red-100 text-red-800"
                                  : ticket.status === "in-progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : ticket.status === "resolved"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                              }
                            >
                              {ticket.status.replace("-", " ")}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{ticket.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Assigned to: {ticket.assignedTo}</span>
                          <span>Created: {ticket.createdDate}</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="mr-2 h-3 w-3" />
                            Update
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <MessageSquare className="mr-2 h-3 w-3" />
                            Comment
                          </Button>
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="mr-2 h-3 w-3" />
                            Resolve
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="communications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Communication History</CardTitle>
                    <CardDescription>All customer interactions and communications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          type: "call",
                          customer: "Sarah Johnson",
                          subject: "Follow-up on service completion",
                          date: "2 hours ago",
                          duration: "15 min",
                          notes:
                            "Customer satisfied with social media audit results. Interested in ongoing management.",
                        },
                        {
                          type: "email",
                          customer: "Michael Chen",
                          subject: "Invoice payment confirmation",
                          date: "1 day ago",
                          notes: "Payment received for business plan development. Sent thank you email.",
                        },
                        {
                          type: "chat",
                          customer: "Emily Rodriguez",
                          subject: "Website development inquiry",
                          date: "2 days ago",
                          duration: "8 min",
                          notes: "Discussed requirements for restaurant website. Scheduled consultation call.",
                        },
                      ].map((comm, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0">
                            {comm.type === "call" && <Phone className="h-5 w-5 text-green-600" />}
                            {comm.type === "email" && <Mail className="h-5 w-5 text-blue-600" />}
                            {comm.type === "chat" && <MessageSquare className="h-5 w-5 text-purple-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{comm.subject}</h4>
                              <span className="text-sm text-gray-500">{comm.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Customer: {comm.customer}</p>
                            {comm.duration && <p className="text-sm text-gray-600">Duration: {comm.duration}</p>}
                            <p className="text-sm mt-2">{comm.notes}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="invoices" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Invoice & Payment Management</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Invoice
                  </Button>
                </div>

                <div className="grid gap-4">
                  {mockInvoices.map((invoice) => (
                    <Card key={invoice.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">Invoice #{invoice.number}</CardTitle>
                            <CardDescription>
                              {invoice.customer} • {invoice.service}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={invoice.status === "paid" ? "default" : "secondary"}
                              className={
                                invoice.status === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : invoice.status === "pending"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {invoice.status}
                            </Badge>
                            <span className="font-bold text-lg">{invoice.amount}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Issue Date</p>
                            <p className="font-medium">{invoice.issueDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Due Date</p>
                            <p className="font-medium">{invoice.dueDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Payment Method</p>
                            <p className="font-medium">{invoice.paymentMethod || "Not specified"}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Commission</p>
                            <p className="font-medium">{invoice.commission}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="mr-2 h-3 w-3" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="mr-2 h-3 w-3" />
                            Edit
                          </Button>
                          {invoice.status === "pending" && (
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                              <CheckCircle className="mr-2 h-3 w-3" />
                              Mark Paid
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
