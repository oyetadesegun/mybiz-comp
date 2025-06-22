import { DollarSign, TrendingUp, CreditCard, Users } from "lucide-react"

export const mockFinanceStats = [
  { title: "Total Revenue", value: "$45,231", change: "+12% from last month", icon: DollarSign },
  { title: "Commission Paid", value: "$6,784", change: "15% of revenue", icon: Users },
  { title: "Pending Payments", value: "$2,156", change: "8 transactions", icon: CreditCard },
  { title: "Monthly Growth", value: "+18%", change: "Above target", icon: TrendingUp },
]

export const mockCommissionPayments = [
  {
    id: 1,
    agent: "Sarah Johnson",
    type: "CX Commission",
    serviceValue: "$1,500",
    amount: "$225",
    status: "paid",
    date: "2024-01-15",
    client: "TechStart Solutions",
  },
  {
    id: 2,
    agent: "Michael Chen",
    type: "Agent Commission",
    serviceValue: "$8,000",
    amount: "$1,200",
    status: "pending",
    date: "2024-01-14",
    client: "Fashion Forward",
  },
  {
    id: 3,
    agent: "Emily Rodriguez",
    type: "CX Commission",
    serviceValue: "$1,200",
    amount: "$180",
    status: "paid",
    date: "2024-01-13",
    client: "Local Eats",
  },
  {
    id: 4,
    agent: "David Kim",
    type: "Agent Commission",
    serviceValue: "$5,900",
    amount: "$885",
    status: "processing",
    date: "2024-01-12",
    client: "Green Energy Co",
  },
]

export const mockRevenueBreakdown = [
  { service: "Social Media Audits", revenue: "$12,450", percentage: "28%", count: "83 services" },
  { service: "Business Plan Development", revenue: "$9,980", percentage: "22%", count: "20 services" },
  { service: "Marketing Strategy", revenue: "$8,760", percentage: "19%", count: "12 services" },
  { service: "Website Development", revenue: "$7,890", percentage: "17%", count: "9 services" },
  { service: "Other Services", revenue: "$6,151", percentage: "14%", count: "Various" },
]

export const mockFinancialReports = [
  { name: "Q4 2023 Revenue Report", date: "3 days ago" },
  { name: "December Commission Summary", date: "1 week ago" },
  { name: "Annual Financial Overview", date: "2 weeks ago" },
  { name: "Expense Analysis Q4", date: "3 weeks ago" },
]
