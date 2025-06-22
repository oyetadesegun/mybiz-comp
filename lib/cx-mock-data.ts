import { MessageSquare, Phone, Calendar, DollarSign } from "lucide-react"

export const mockCXRequests = [
  {
    id: "req1",
    clientName: "Sarah Johnson",
    businessName: "Fashion Boutique",
    businessType: "Retail Store",
    title: "Need help with social media marketing strategy",
    description:
      "I'm struggling to get engagement on my Instagram and Facebook pages. My posts aren't reaching enough people and sales from social media are very low.",
    category: "Marketing & Sales",
    urgency: "This week",
    urgencyColor: "bg-orange-50 text-orange-700",
    phone: "+1 (555) 123-4567",
    submittedDate: "2 hours ago",
    status: "new",
    lastContact: null,
  },
  {
    id: "req2",
    clientName: "Michael Chen",
    businessName: "Tech Startup",
    businessType: "Software Development",
    title: "Cash flow management issues",
    description:
      "Our startup is growing but we're having trouble managing cash flow. We need help with financial planning and budgeting.",
    category: "Finance & Cash Flow",
    urgency: "Immediate",
    urgencyColor: "bg-red-50 text-red-700",
    phone: "+1 (555) 987-6543",
    submittedDate: "1 day ago",
    status: "contacted",
    lastContact: "Called yesterday, scheduled follow-up",
  },
  {
    id: "req3",
    clientName: "Emily Rodriguez",
    businessName: "Local Restaurant",
    businessType: "Food & Beverage",
    title: "Website development and online ordering",
    description:
      "We need a professional website with online ordering capabilities. Our current website is outdated and not mobile-friendly.",
    category: "Technology & Digital",
    urgency: "This month",
    urgencyColor: "bg-blue-50 text-blue-700",
    phone: "+1 (555) 456-7890",
    submittedDate: "3 days ago",
    status: "in-progress",
    lastContact: "Service booked, provider assigned",
  },
  {
    id: "req4",
    clientName: "David Brown",
    businessName: "Consulting Firm",
    businessType: "Professional Services",
    title: "Business expansion strategy",
    description:
      "Looking to expand our consulting services to new markets. Need help with market research and expansion planning.",
    category: "Strategy & Growth",
    urgency: "Planning for future",
    urgencyColor: "bg-green-50 text-green-700",
    phone: "+1 (555) 321-0987",
    submittedDate: "1 week ago",
    status: "completed",
    lastContact: "Service completed, follow-up scheduled",
  },
]

export const mockCXStats = [
  { title: "New Requests", value: "12", change: "+3 today", icon: MessageSquare },
  { title: "Calls Made", value: "28", change: "This week", icon: Phone },
  { title: "Services Booked", value: "15", change: "+5 this month", icon: Calendar },
  { title: "Commission Earned", value: "$1,245", change: "This month", icon: DollarSign },
]
