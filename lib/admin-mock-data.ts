import { Users, DollarSign, FileText, TrendingUp, UserPlus, Settings, Bell, Activity, CheckCircle } from "lucide-react"

export const mockUsers = [
  {
    id: "1",
    name: "John Admin",
    email: "john@mybiz.com",
    role: "admin",
    roleColor: "bg-red-100 text-red-800",
    status: "active",
    lastActive: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@mybiz.com",
    role: "cx",
    roleColor: "bg-blue-100 text-blue-800",
    status: "active",
    lastActive: "1 hour ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@mybiz.com",
    role: "agent",
    roleColor: "bg-green-100 text-green-800",
    status: "active",
    lastActive: "30 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily@mybiz.com",
    role: "auditor",
    roleColor: "bg-purple-100 text-purple-800",
    status: "active",
    lastActive: "4 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@mybiz.com",
    role: "finance",
    roleColor: "bg-yellow-100 text-yellow-800",
    status: "active",
    lastActive: "1 day ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "6",
    name: "Maria Garcia",
    email: "maria@mybiz.com",
    role: "service-provider",
    roleColor: "bg-indigo-100 text-indigo-800",
    status: "active",
    lastActive: "3 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export const mockSystemStats = [
  { title: "Total Users", value: "1,234", change: "+12% from last month", icon: Users },
  { title: "Monthly Revenue", value: "$45,231", change: "+8% from last month", icon: DollarSign },
  { title: "Active Services", value: "89", change: "15 completed today", icon: FileText },
  { title: "System Uptime", value: "99.9%", change: "Last 30 days", icon: TrendingUp },
]

export const mockKPIs = [
  {
    title: "Customer Satisfaction",
    value: "4.8/5",
    change: "+0.2 this month",
    icon: Users,
    color: "text-green-600",
    changeColor: "text-green-600",
  },
  {
    title: "Revenue Growth",
    value: "+18%",
    change: "vs last quarter",
    icon: TrendingUp,
    color: "text-blue-600",
    changeColor: "text-blue-600",
  },
  {
    title: "Service Completion",
    value: "94%",
    change: "on-time delivery",
    icon: CheckCircle,
    color: "text-green-600",
    changeColor: "text-green-600",
  },
  {
    title: "System Reliability",
    value: "99.9%",
    change: "uptime this month",
    icon: Activity,
    color: "text-purple-600",
    changeColor: "text-purple-600",
  },
]

export const mockRecentActivity = [
  { action: "New user registration", timestamp: "2 minutes ago", icon: UserPlus },
  { action: "Service completed", timestamp: "15 minutes ago", icon: FileText },
  { action: "Commission payment processed", timestamp: "1 hour ago", icon: DollarSign },
  { action: "System backup completed", timestamp: "2 hours ago", icon: Settings },
  { action: "New service request", timestamp: "3 hours ago", icon: Bell },
]
