'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import prisma from '@/prisma/client/client'

export default async function Issues() {
  const issues = await prisma.getHelpQuestion.findMany({
    include: {
      Profile: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      },
      responses: {
        include: {
          staff: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      documents: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="flex-1 px-6 py-8 bg-gray-50">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Business Issues</h1>
        <Link href="/get-help">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Submit New Issue</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {issues.map((issue) => (
          <Card key={issue.id} className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg capitalize">{issue.businessCategory}</CardTitle>
                  <CardDescription>
                    Submitted {new Date(issue.createdAt).toDateString()} by{' '}
                    {issue.Profile?.user?.name || 'Anonymous'}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    issue.status === 'resolved'
                      ? 'default'
                      : issue.status === 'in_progress'
                      ? 'secondary'
                      : issue.status === 'closed'
                      ? 'destructive'
                      : 'outline'
                  }
                  className={
                    issue.status === 'resolved'
                      ? 'bg-green-100 text-green-800'
                      : issue.status === 'in_progress'
                      ? 'bg-blue-100 text-blue-800'
                      : issue.status === 'closed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-orange-100 text-orange-800'
                  }
                >
                  {issue.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{issue.businessChallenge}</p>

              {issue.responses.length > 0 && (
                <div className="space-y-4 mt-4">
                  {issue.responses.map((response) => (
                    <div
                      key={response.id}
                      className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-blue-900 font-semibold">
                          {response.staff.name} ({response.staffRole})
                        </div>
                        <div className="text-xs text-blue-600">
                          {new Date(response.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-blue-800 text-sm">{response.content}</p>
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
