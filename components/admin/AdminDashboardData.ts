import { getAllIssues } from "@/actions/admin/admin.issue.actions"
import {
  Users, DollarSign, AlertCircle, Clock, FileText, TrendingUp, UserPlus, Settings, Bell, Activity, CheckCircle
} from "lucide-react"

 export default async function AdminDashboardData() {
const {totalCount,thisMonthCount} = await getAllIssues()

 const mockSystemStats = [
  { title: "Total Users", value: "1,234", change: "+12% from last month", icon: Users },
  { title: "Monthly Revenue", value: "$45,231", change: "+8% from last month", icon: DollarSign },
  { title: "Active Services", value: "89", change: "15 completed today", icon: FileText },
  { title: "System Uptime", value: "99.9%", change: "Last 30 days", icon: TrendingUp },
]

 const  mockKPIs = [
  {
    title: "Total Issues",
    value: totalCount.toString(),
    change: `${thisMonthCount} this month`,
    icon: Users,
    color: "text-green-600",
    changeColor: "text-green-600",
    link: "/admin/issues"
  },
  {
    title: "Revenue Growth",
    value: "+18%",
    change: "vs last quarter",
    icon: TrendingUp,
    color: "text-blue-600",
    changeColor: "text-blue-600",
    link: "/admin/issues"
  },
  {
    title: "Service Completion",
    value: "94%",
    change: "on-time delivery",
    icon: CheckCircle,
    color: "text-green-600",
    changeColor: "text-green-600",
    link: "/admin/issues"
  },
  {
    title: "System Reliability",
    value: "99.9%",
    change: "uptime this month",
    icon: Activity,
    color: "text-purple-600",
    changeColor: "text-purple-600",
    link: "/admin/issues"
  },
]

 const mockRecentActivity = [
  { action: "New user registration", timestamp: "2 minutes ago", icon: UserPlus },
  { action: "Service completed", timestamp: "15 minutes ago", icon: FileText },
  { action: "Commission payment processed", timestamp: "1 hour ago", icon: DollarSign },
  { action: "System backup completed", timestamp: "2 hours ago", icon: Settings },
  { action: "New service request", timestamp: "3 hours ago", icon: Bell },
]


// lib/admin-mock-data.js


 const mockAllUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.j@example.com",
    role: "admin",
    status: "active",
    lastActive: "2 hours ago",
    avatar: "/placeholder-user.jpg",
    roleColor: "bg-red-100 text-red-800",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob.w@example.com",
    role: "cx",
    status: "active",
    lastActive: "1 day ago",
    avatar: "/placeholder-user.jpg",
    roleColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.b@example.com",
    role: "agent",
    status: "inactive",
    lastActive: "3 days ago",
    avatar: "/placeholder-user.jpg",
    roleColor: "bg-teal-100 text-teal-800",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.p@example.com",
    role: "service-provider",
    status: "active",
    lastActive: "5 hours ago",
    avatar: "/placeholder-user.jpg",
    roleColor: "bg-purple-100 text-purple-800",
  },
  {
    id: 5,
    name: "Eve Adams",
    email: "eve.a@example.com",
    role: "finance",
    status: "active",
    lastActive: "1 hour ago",
    avatar: "/placeholder-user.jpg",
    roleColor: "bg-green-100 text-green-800",
  },
  {
    id: 6,
    name: "Frank White",
    email: "frank.w@example.com",
    role: "auditor",
    status: "inactive",
    lastActive: "1 week ago",
    avatar: "/placeholder-user.jpg",
    roleColor: "bg-orange-100 text-orange-800",
  },
  {
    id: 7,
    name: "Grace Taylor",
    email: "grace.t@example.com",
    role: "client",
    status: "active",
    lastActive: "just now",
    avatar: "/placeholder-user.jpg",
    roleColor: "bg-gray-100 text-gray-800",
  },
];

 const mockStaffRecentActivity = [
  {
    action: "User 'Alice Johnson' logged in.",
    timestamp: "2 hours ago",
    icon: Clock,
  },
  {
    action: "New support ticket #1234 created.",
    timestamp: "4 hours ago",
    icon: AlertCircle,
  },
  {
    action: "System configuration updated by 'Bob Williams'.",
    timestamp: "1 day ago",
    icon: Settings,
  },
  {
    action: "User 'Charlie Brown' account deactivated.",
    timestamp: "3 days ago",
    icon: Users,
  },
  {
    action: "Financial report generated.",
    timestamp: "5 days ago",
    icon: DollarSign,
  },
];

 const mockAdminKPIs = [
  {
    title: "Total Users",
    value: "2,450",
    change: "+12% from last month",
    color: "text-blue-500",
    changeColor: "text-green-600",
    icon: Users,
  },
  {
    title: "Revenue",
    value: "$45,231",
    change: "+8% from last month",
    color: "text-green-500",
    changeColor: "text-green-600",
    icon: DollarSign,
  },
  {
    title: "Active Sessions",
    value: "1,247",
    change: "-3% from last month",
    color: "text-orange-500",
    changeColor: "text-red-600",
    icon: Activity,
  },
  {
    title: "Pending Issues",
    value: "12",
    change: "+2 since last week",
    color: "text-red-500",
    changeColor: "text-red-600",
    icon: AlertCircle,
  },
];
return {mockKPIs, mockRecentActivity}
}