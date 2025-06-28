// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Groups
//   await prisma.group.createMany({
//     data: [
//       {
//         id: 'group1',
//         name: 'Startup Founders Network',
//         description: 'A place for founders to discuss fundraising, product-market fit and scaling.',
//         isPrivate: false,
//         memberCount: 124
//       },
//       {
//         id: 'group2',
//         name: 'Retail Business Owners',
//         description: 'Strategies and support for physical & online retail stores.',
//         isPrivate: true,
//         memberCount: 87
//       }
//     ]
//   })

//   // Forum Posts
//   await prisma.forumPost.createMany({
//     data: [
//       {
//         id: 'post1',
//         title: 'Best practices for small business inventory management?',
//         content: `I'm running a small retail store and struggling with inventory management. Sometimes I'm overstocked, sometimes understocked.`,
//         authorId: 'user1',
//         category: 'Operations',
//         date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
//         replies: 12,
//         likes: 8
//       },
//       {
//         id: 'post2',
//         title: 'Social media marketing on a tight budget - what works?',
//         content: `As a startup with limited marketing budget, I'm trying to figure out the most cost-effective social media strategies.`,
//         authorId: 'user2',
//         category: 'Marketing',
//         date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
//         replies: 15,
//         likes: 23
//       },
//       {
//         id: 'post3',
//         title: 'When to hire your first employee?',
//         content: `I've been running my consulting business solo for 2 years. Business is growing but I'm overwhelmed.`,
//         authorId: 'user3',
//         category: 'Strategy',
//         date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
//         replies: 9,
//         likes: 14
//       },
//       {
//         id: 'post4',
//         title: 'Dealing with difficult customers - strategies that work',
//         content: `Every business has them - customers who are never satisfied, always complaining, or making unreasonable demands.`,
//         authorId: 'user4',
//         category: 'General',
//         date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
//         replies: 28,
//         likes: 35
//       }
//     ]
//   })

  // Questions
await prisma.getHelpQuestion.createMany({
  data: [
    {
      id: '1',
      title: "How can I improve my startup's cash flow?",
      businessName: "Cash Flow Pros",
      businessType: "Startup",
      businessChallenge: "Managing cash flow in early-stage startup.",
      businessCategory: "finance",
      urgencyLevel: "high",
      fullName: "Jane Doe",
      emailAddress: "jane@example.com",
      businessAddress: "123 Startup Lane",
      phone: "+1 555-111-2222",
      willingToPay: "Yes",
      websiteUrl: null,
      instagramUrl: null,
      twitterUrl: null,
      facebookUrl: null,
      status: "pending",
    },
    {
      id: '2',
      title: "What marketing channels work best for B2B SaaS?",
      businessName: "SaaSify",
      businessType: "Software",
      businessChallenge: "Deciding which marketing strategies to invest in.",
      businessCategory: "marketing",
      urgencyLevel: "medium",
      fullName: "John Smith",
      emailAddress: "john@example.com",
      businessAddress: "456 Software St.",
      phone: "+1 555-222-3333",
      willingToPay: "Maybe",
      websiteUrl: null,
      instagramUrl: null,
      twitterUrl: null,
      facebookUrl: null,
      status: "pending",
    },
    {
      id: '3',
      title: "How do I scale my team without hurting culture?",
      businessName: "CultureTech",
      businessType: "Tech",
      businessChallenge: "Maintaining team culture while scaling.",
      businessCategory: "hr",
      urgencyLevel: "low",
      fullName: "Linda Green",
      emailAddress: "linda@example.com",
      businessAddress: "789 Culture Blvd.",
      phone: "+1 555-333-4444",
      willingToPay: "No",
      websiteUrl: null,
      instagramUrl: null,
      twitterUrl: null,
      facebookUrl: null,
      status: "pending",
    },
  ],
});


  // Leads, Issues, Meetings, Evaluations etc. to be handled next
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })