export const mockGroups = [
  {
    id: "group1",
    name: "Startup Founders Network",
    description: "A place for founders to discuss fundraising, product-market fit and scaling.",
    isPrivate: false,
    isMember: true,
    memberCount: 124,
    recentMembers: [
      { name: "Alex", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Sarah", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "John", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "group2",
    name: "Retail Business Owners",
    description: "Strategies and support for physical & online retail stores.",
    isPrivate: true,
    isMember: false,
    memberCount: 87,
    recentMembers: [
      { name: "Emily", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Michael", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
]

export const mockGroupMessages = [
  {
    id: "msg1",
    content: "Welcome to the group everyone!",
    timestamp: "2h ago",
    author: { id: "alex", name: "Alex Thompson", avatar: "/placeholder.svg?height=32&width=32" },
  },
  {
    id: "msg2",
    content: "Does anyone have tips for preparing for seed-round pitches?",
    timestamp: "1h ago",
    author: { id: "sarah", name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
  },
]

export const mockMeetings = [
  {
    id: "meet1",
    title: "Weekly Strategy Sync",
    group: "Startup Founders Network",
    date: "Jun 22, 2025",
    time: "10:00 AM",
    duration: 60,
    description: "Discuss growth metrics & blockers.",
    isPast: false,
  },
  {
    id: "meet2",
    title: "Retail Q3 Planning",
    group: "Retail Business Owners",
    date: "May 2, 2025",
    time: "3:00 PM",
    duration: 45,
    description: "",
    isPast: true,
  },
]

export const mockLeads = [
  {
    id: "lead1",
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    challenge:
      "I'm struggling with cash flow management in my retail store. Sales are good but I'm always short on cash to pay suppliers.",
    category: "Finance & Cash Flow",
    urgency: "This week",
    submittedDate: "2 hours ago",
    status: "pending",
    referralCode: "REF123",
  },
  {
    id: "lead2",
    name: "Michael Chen",
    phone: "+1 (555) 987-6543",
    challenge:
      "Need help with digital marketing strategy for my tech startup. Not sure where to focus our limited budget.",
    category: "Marketing & Sales",
    urgency: "This month",
    submittedDate: "1 day ago",
    status: "contacted",
    referralCode: null,
  },
  {
    id: "lead3",
    name: "Emily Rodriguez",
    phone: "+1 (555) 456-7890",
    challenge: "Looking to expand my restaurant business but need guidance on legal requirements and permits.",
    category: "Legal & Compliance",
    urgency: "Planning for future",
    submittedDate: "3 days ago",
    status: "pending",
    referralCode: "REF456",
  },
]

export const mockClientIssues = [
  {
    id: "issue1",
    clientName: "John Smith",
    category: "Marketing & Sales",
    description:
      "Need help developing a comprehensive digital marketing strategy for my e-commerce business. Current conversion rates are low.",
    submittedDate: "5 days ago",
    status: "resolved",
    response:
      "Based on your e-commerce business model, I recommend focusing on: 1) Optimizing your product pages with better descriptions and images, 2) Implementing email marketing campaigns for abandoned carts, 3) Using retargeting ads on social media, 4) A/B testing your checkout process to reduce friction. Start with email marketing as it typically has the highest ROI.",
    responseDate: "3 days ago",
  },
  {
    id: "issue2",
    clientName: "Lisa Wang",
    category: "Finance & Cash Flow",
    description:
      "My consulting business has irregular income. Some months are great, others are terrible. How can I better manage cash flow?",
    submittedDate: "2 days ago",
    status: "in-progress",
    response:
      "For consulting businesses with irregular income, consider: 1) Building a cash reserve equal to 3-6 months of expenses, 2) Implementing retainer agreements with key clients, 3) Diversifying your service offerings, 4) Creating passive income streams like online courses. Let's schedule a call to discuss your specific situation in detail.",
    responseDate: "1 day ago",
  },
  {
    id: "issue3",
    clientName: "David Brown",
    category: "Operations & Management",
    description:
      "I'm having trouble managing my growing team. Communication is breaking down and projects are falling behind schedule.",
    submittedDate: "1 day ago",
    status: "pending",
    response: null,
    responseDate: null,
  },
]

export const mockSocialMediaEvaluations = [
  {
    id: "eval1",
    clientName: "Sarah Johnson",
    platform: "Instagram",
    score: 6,
    completedDate: "2 days ago",
    evaluator: "Maria Garcia",
    status: "completed",
    billingAmount: 150,
    billingStatus: "paid",
    evaluatorComments:
      "Account has good visual consistency but lacks engagement strategy. Posting frequency is inconsistent. Recommend implementing a content calendar and focusing on story engagement.",
    findings: [
      "Good visual branding and consistency",
      "Low engagement rate (2.1% vs industry average 3.5%)",
      "Inconsistent posting schedule",
      "Limited use of Instagram Stories and Reels",
      "Hashtag strategy needs improvement",
    ],
    recommendations: [
      "Create and follow a content calendar",
      "Increase use of Instagram Stories and Reels",
      "Implement a hashtag research strategy",
      "Engage more with followers' comments",
      "Consider influencer partnerships",
    ],
  },
  {
    id: "eval2",
    clientName: "Michael Chen",
    platform: "LinkedIn",
    score: 8,
    completedDate: "1 week ago",
    evaluator: "James Wilson",
    status: "completed",
    billingAmount: 200,
    billingStatus: "pending",
    evaluatorComments:
      "Strong professional presence with good content quality. Excellent engagement rates. Minor improvements needed in posting frequency and video content integration.",
    findings: [
      "Professional and consistent branding",
      "High engagement rate (5.2%)",
      "Quality content that provides value",
      "Good network connections",
      "Limited video content",
    ],
    recommendations: [
      "Increase posting frequency to 3-4 times per week",
      "Add more video content and LinkedIn Live sessions",
      "Create LinkedIn newsletter",
      "Engage more in relevant LinkedIn groups",
      "Share more behind-the-scenes content",
    ],
  },
]

export const mockForumPosts = [
  {
    id: "post1",
    title: "Best practices for small business inventory management?",
    content:
      "I'm running a small retail store and struggling with inventory management. Sometimes I'm overstocked, sometimes understocked. What systems or practices have worked for other small business owners?",
    author: {
      id: "user1",
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Operations",
    date: "2 days ago",
    replies: 12,
    likes: 8,
  },
  {
    id: "post2",
    title: "Social media marketing on a tight budget - what works?",
    content:
      "As a startup with limited marketing budget, I'm trying to figure out the most cost-effective social media strategies. What platforms and tactics have given you the best ROI?",
    author: {
      id: "user2",
      name: "Jennifer Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Marketing",
    date: "1 day ago",
    replies: 15,
    likes: 23,
  },
  {
    id: "post3",
    title: "When to hire your first employee?",
    content:
      "I've been running my consulting business solo for 2 years. Business is growing but I'm overwhelmed. How do you know when it's time to hire your first employee? What should I look for?",
    author: {
      id: "user3",
      name: "Robert Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Strategy",
    date: "3 days ago",
    replies: 9,
    likes: 14,
  },
  {
    id: "post4",
    title: "Dealing with difficult customers - strategies that work",
    content:
      "Every business has them - customers who are never satisfied, always complaining, or making unreasonable demands. What are your go-to strategies for handling difficult customers while maintaining professionalism?",
    author: {
      id: "user4",
      name: "Maria Santos",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "General",
    date: "1 week ago",
    replies: 28,
    likes: 35,
  },
]
