import { NextResponse } from 'next/server'
import prisma from '@/prisma/client/client'

export async function GET() {
  const issues = await prisma.getHelpQuestion.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const formatted = issues.map((issue) => ({
    id: issue.id,
    clientName: issue.fullName,
    category: issue.businessCategory,
    description: issue.businessChallenge,
    submittedDate: new Date(issue.createdAt).toLocaleDateString(),
    status: "pending", // replace this with real status if available
    response: null,
    responseDate: null,
  }))

  return NextResponse.json(formatted)
}
