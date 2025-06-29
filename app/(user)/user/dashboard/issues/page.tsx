import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import prisma from '@/prisma/client/client'

export default async function Issues() {
  const issues = await prisma.getHelpQuestion.findMany({
    include: {
      Profile: {
        include: {
          user: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
      },
      responses: {
        include: {
          staff: { select: { id: true, name: true, email: true, role: true } },
          customer: { select: { id: true, name: true, email: true } },
        },
      },
      documents: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'closed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-orange-100 text-orange-800'
    }
  }

  return (
    <div className="flex-1 px-4 sm:px-6 md:px-10 py-10 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          My Business Issues
        </h1>
        <Link href="/get-help">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Submit New Issue
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {issues.map((issue) => (
          <Card key={issue.id} className="shadow-sm border-gray-200">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-lg capitalize">
                    {issue.title}
                  </CardTitle>
                  <CardDescription>
                    Submitted on{' '}
                    <span className="font-medium">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </span>{' '}
                    by{' '}
                    <span className="text-blue-800 font-semibold">
                      {issue.Profile?.user?.name || 'Anonymous'}
                    </span>
                  </CardDescription>
                </div>
                <Badge className={getStatusStyle(issue.status)}>
                  {issue.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-gray-700">
                <p className="font-medium mb-1">Business Challenge:</p>
                <p className="text-sm">{issue.businessChallenge}</p>
              </div>

              <div className="text-sm text-gray-600">
                <p>
                  <strong>Business:</strong> {issue.businessName} (
                  {issue.businessType})
                </p>
                <p>
                  <strong>Urgency:</strong> {issue.urgencyLevel}
                </p>
                <p>
                  <strong>Contact:</strong> {issue.fullName} |{' '}
                  {issue.emailAddress} | {issue.phone}
                </p>
                {issue.willingToPay && (
                  <p>
                    <strong>Willing to Pay:</strong> {issue.willingToPay}
                  </p>
                )}
              </div>

              {issue.responses.length > 0 && (
                <div className="mt-4 space-y-4">
                  <h4 className="text-base font-semibold text-blue-900">
                    Expert Responses
                  </h4>

                  {issue.responses.map((response) => (
                    <div
                      key={response.id}
                      className="bg-blue-50 p-4 rounded-lg border border-blue-200 space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-blue-900">
                          {response.staff.name} ({response.staff.role})
                        </div>
                        <div className="text-xs text-blue-600">
                          {new Date(response.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <p className="text-sm text-blue-800">{response.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
