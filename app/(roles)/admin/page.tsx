"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Settings, BarChart, Shield, DollarSign, Bell, Search, UserPlus, Edit, Trash2, Eye } from "lucide-react"
import { mockUsers, mockSystemStats, mockRecentActivity } from "@/lib/admin-mock-data"
import { SignOut } from "@/components/SignOut"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  /**
   * Safely performs a case-insensitive search even when any value is undefined.
   */
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
          <span className="ml-2 text-xl font-bold text-gray-900">Admin Dashboard</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
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
                  Overview
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
                  Role Management
                </button>
                <button
                  onClick={() => setActiveTab("finance")}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                    activeTab === "finance"
                      ? "bg-red-50 text-red-600"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                  Financial Overview
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
                  System Settings
                </button>
                <Link
                  href="/cx"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:text-red-600 hover:bg-red-50"
                >
                  <Bell className="h-4 w-4" />
                  CX Dashboard
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
          {/* <SignOut/> */}
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="mx-auto max-w-7xl space-y-6">
            {activeTab === "overview" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Overview</h1>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {mockSystemStats.map((stat, index) => (
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

                <div className="grid gap-6 md:grid-cols-2">
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

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add New User
                      </Button>
                      <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                        System Backup
                      </Button>
                      <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50">
                        Generate Reports
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeTab === "users" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">User Management</h1>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
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
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Role Management</h1>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Create Role</Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { name: "Admin", users: 3, permissions: ["Full Access"], color: "bg-red-100 text-red-800" },
                    {
                      name: "CX Representative",
                      users: 8,
                      permissions: ["View Requests", "Client Follow-up", "Book Services"],
                      color: "bg-blue-100 text-blue-800",
                    },
                    {
                      name: "Agent",
                      users: 15,
                      permissions: ["Book Services", "Earn Commission", "Client Management"],
                      color: "bg-green-100 text-green-800",
                    },
                    {
                      name: "Auditor",
                      users: 2,
                      permissions: ["Financial Review", "Compliance Check"],
                      color: "bg-purple-100 text-purple-800",
                    },
                    {
                      name: "Finance",
                      users: 4,
                      permissions: ["Financial Management", "Commission Processing"],
                      color: "bg-yellow-100 text-yellow-800",
                    },
                    {
                      name: "Service Provider",
                      users: 25,
                      permissions: ["Receive Tasks", "Update Progress"],
                      color: "bg-indigo-100 text-indigo-800",
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
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Permissions:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {role.permissions.map((permission, i) => (
                              <li key={i}>• {permission}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Users className="h-3 w-3 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {activeTab === "finance" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Financial Overview</h1>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Commission Paid</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$6,784</div>
                      <p className="text-xs text-muted-foreground">15% of revenue</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$2,156</div>
                      <p className="text-xs text-muted-foreground">8 transactions</p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeTab === "system" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">System Settings</h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Maintenance Mode</span>
                        <Button size="sm" variant="outline">
                          Toggle
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>User Registration</span>
                        <Button size="sm" variant="outline">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <Button size="sm" variant="outline">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Commission Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Agent Commission Rate</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>CX Commission Rate</span>
                        <span className="font-medium">5%</span>
                      </div>
                      <Button size="sm" className="w-full">
                        Update Rates
                      </Button>
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
