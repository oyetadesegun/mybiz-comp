import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockClientIssues } from '@/lib/mock-data'
import { CheckCircle, DollarSign, MessageSquare, Phone, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Issues() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Business Issues</h1>
        <Link href="/get-help">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Submit New Issue</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {mockClientIssues.map((issue) => (
          <Card key={issue.id} className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{issue.category}</CardTitle>
                  <CardDescription>Submitted {issue.submittedDate}</CardDescription>
                </div>
                <Badge
                  variant={
                    issue.status === "resolved"
                      ? "default"
                      : issue.status === "in-progress"
                        ? "secondary"
                        : "outline"
                  }
                  className={
                    issue.status === "resolved"
                      ? "bg-green-100 text-green-800"
                      : issue.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-orange-100 text-orange-800"
                  }
                >
                  {issue.status.replace("-", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{issue.description}</p>
              {issue.response && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Expert Response:</h4>
                  <p className="text-blue-800 text-sm">{issue.response}</p>
                  {issue.responseDate && (
                    <p className="text-xs text-blue-600 mt-2">Responded on {issue.responseDate}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
