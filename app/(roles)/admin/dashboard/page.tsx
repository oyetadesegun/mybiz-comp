"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
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
import { Switch } from "@/components/ui/switch"
import {
  Users,
  Settings,
  BarChart,
  Shield,
  DollarSign,
  Bell,
  Search,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
} from "lucide-react"
import { mockUsers, mockRecentActivity, mockKPIs } from "@/lib/admin-mock-data"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const filteredUsers = mockUsers.filter((user) => {
    const query = (searchTerm ?? "").toLowerCase()
    const name = (user.name ?? "").toLowerCase()
    const email = (user.email ?? "").toLowerCase()
    const matchesSearch = name.includes(query) || email.includes(query)
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">Admin Control Panel</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Super Admin
          </Badge>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
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
                      ? "bg-red-50 text-red-600"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <BarChart className="h-4 w-4" />
                  Overview & KPIs
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "users"
                      ? "bg-red-50 text-red-600"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  User Management
                </button>
                <button
                  onClick={() => setActiveTab("roles")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "roles"
                      ? "bg-red-50 text-red-600"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  RBAC & Permissions
                </button>
                <button
                  onClick={() => setActiveTab("system")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "system"
                      ? "bg-red-50 text-red-600"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  System Configuration
                </button>
                <button
                  onClick={() => setActiveTab("monitoring")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "monitoring"
                      ? "bg-red-50 text-red-600"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Activity className="h-4 w-4" />
                  Monitoring & Analytics
                </button>
                <Link
                  href="/crm"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:text-red-600 hover:bg-red-50"
                >
                  <Users className="h-4 w-4" />
                  CRM Dashboard
                </Link>
                <Link
                  href="/finance"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:text-red-600 hover:bg-red-50"
                >
                  <DollarSign className="h-4 w-4" />
                  Finance Dashboard
                </Link>
                <Link
                  href="/auditor"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:text-red-600 hover:bg-red-50"
                >
                  <Eye className="h-4 w-4" />
                  Auditor Panel
                </Link>
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mx-auto max-w-7xl space-y-6">
            {activeTab === "overview" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">System Overview & KPIs</h1>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {mockKPIs.map((kpi, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                        <p className={`text-xs ${kpi.changeColor}`}>{kpi.change}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Server Uptime</span>
                        <Badge className="bg-green-100 text-green-800">99.9%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Database Performance</span>
                        <Badge className="bg-green-100 text-green-800">Optimal</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>API Response Time</span>
                        <Badge className="bg-yellow-100 text-yellow-800">125ms</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Active Sessions</span>
                        <span className="font-medium">1,247</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent System Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockRecentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <activity.icon className="h-4 w-4 text-blue-500" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeTab === "users" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">User Management</h1>
                  <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create New User</DialogTitle>
                        <DialogDescription>
                          Add a new user to the system with appropriate role and permissions.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" placeholder="Full name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input id="email" type="email" placeholder="email@example.com" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Role
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="cx">CX Representative</SelectItem>
                              <SelectItem value="agent">Agent</SelectItem>
                              <SelectItem value="service-provider">Service Provider</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="auditor">Auditor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700 text-white">Create User</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="cx">CX Representative</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="auditor">Auditor</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="service-provider">Service Provider</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b">
                          <tr>
                            <th className="text-left p-4">User</th>
                            <th className="text-left p-4">Role</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Last Active</th>
                            <th className="text-left p-4">Permissions</th>
                            <th className="text-left p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b">
                              <td className="p-4">
                                <div className="flex items-center space-x-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge variant="outline" className={user.roleColor}>
                                  {user.role}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <Badge
                                  variant={user.status === "active" ? "default" : "secondary"}
                                  className={
                                    user.status === "active"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                                  }
                                >
                                  {user.status}
                                </Badge>
                              </td>
                              <td className="p-4 text-sm text-gray-500">{user.lastActive}</td>
                              <td className="p-4">
                                <Button size="sm" variant="outline">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Manage
                                </Button>
                              </td>
                              <td className="p-4">
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "roles" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Role-Based Access Control</h1>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Create Role</Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      name: "Super Admin",
                      users: 2,
                      permissions: ["Full System Access", "User Management", "System Configuration", "All Data Access"],
                      color: "bg-red-100 text-red-800",
                    },
                    {
                      name: "CX Manager",
                      users: 5,
                      permissions: ["CRM Access", "Ticket Management", "Customer Data", "Invoice Creation"],
                      color: "bg-blue-100 text-blue-800",
                    },
                    {
                      name: "Finance Manager",
                      users: 3,
                      permissions: [
                        "Financial Reports",
                        "Invoice Management",
                        "Payment Processing",
                        "Commission Tracking",
                      ],
                      color: "bg-green-100 text-green-800",
                    },
                    {
                      name: "Service Provider",
                      users: 25,
                      permissions: ["Task Management", "Customer Communication", "Progress Updates"],
                      color: "bg-purple-100 text-purple-800",
                    },
                    {
                      name: "Auditor",
                      users: 2,
                      permissions: ["Audit Logs", "Compliance Monitoring", "Report Generation"],
                      color: "bg-orange-100 text-orange-800",
                    },
                    {
                      name: "Agent",
                      users: 15,
                      permissions: ["Service Booking", "Commission Tracking", "Client Management"],
                      color: "bg-teal-100 text-teal-800",
                    },
                  ].map((role, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{role.name}</CardTitle>
                          <Badge className={role.color}>{role.users} users</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-2">Permissions:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {role.permissions.map((permission, i) => (
                                <li key={i} className="flex items-center">
                                  <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                  {permission}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Users className="h-3 w-3 mr-1" />
                              Users
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {activeTab === "system" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">System Configuration</h1>
                </div>

                <Tabs defaultValue="general" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="general">General Settings</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-4">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Application Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Maintenance Mode</Label>
                              <p className="text-sm text-gray-500">Enable to restrict access during updates</p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>User Registration</Label>
                              <p className="text-sm text-gray-500">Allow new users to register</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Auto-backup</Label>
                              <p className="text-sm text-gray-500">Automatic daily system backups</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Business Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Default Commission Rate (%)</Label>
                            <Input type="number" defaultValue="15" />
                          </div>
                          <div className="space-y-2">
                            <Label>CX Commission Rate (%)</Label>
                            <Input type="number" defaultValue="5" />
                          </div>
                          <div className="space-y-2">
                            <Label>Service Completion Threshold (days)</Label>
                            <Input type="number" defaultValue="7" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Two-Factor Authentication</Label>
                            <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Session Timeout</Label>
                            <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
                          </div>
                          <Select defaultValue="30">
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 min</SelectItem>
                              <SelectItem value="30">30 min</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="120">2 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Password Policy</Label>
                            <p className="text-sm text-gray-500">Enforce strong passwords</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-gray-500">Send email alerts for important events</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>SMS Notifications</Label>
                            <p className="text-sm text-gray-500">Send SMS for urgent alerts</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-gray-500">Browser push notifications</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="integrations" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Payment Gateways</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Stripe</span>
                            <Badge className="bg-green-100 text-green-800">Connected</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>PayPal</span>
                            <Badge className="bg-green-100 text-green-800">Connected</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Square</span>
                            <Badge variant="outline">Not Connected</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Communication</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Twilio SMS</span>
                            <Badge className="bg-green-100 text-green-800">Connected</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>SendGrid Email</span>
                            <Badge className="bg-green-100 text-green-800">Connected</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Slack</span>
                            <Badge variant="outline">Not Connected</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}

            {activeTab === "monitoring" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Monitoring & Analytics</h1>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export Analytics
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">Real-time View</Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,247</div>
                      <p className="text-xs text-green-600">+12% from yesterday</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">System Load</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23%</div>
                      <p className="text-xs text-green-600">Normal range</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">0.1%</div>
                      <p className="text-xs text-green-600">Below threshold</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">125ms</div>
                      <p className="text-xs text-yellow-600">Slightly elevated</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Activity Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Peak Hours</span>
                          <span className="font-medium">9 AM - 5 PM</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Most Active Day</span>
                          <span className="font-medium">Tuesday</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Average Session</span>
                          <span className="font-medium">24 minutes</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Bounce Rate</span>
                          <span className="font-medium">12%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <div>
                          <p className="text-sm font-medium">High Memory Usage</p>
                          <p className="text-xs text-gray-600">Server 2 - 85% memory utilization</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Bell className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium">Scheduled Maintenance</p>
                          <p className="text-xs text-gray-600">Database optimization in 2 hours</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">Backup Completed</p>
                          <p className="text-xs text-gray-600">Daily backup successful at 3:00 AM</p>
                        </div>
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
