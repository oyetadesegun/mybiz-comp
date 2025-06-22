import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockSocialMediaEvaluations } from '@/lib/mock-data'
import React from 'react'

export default function Audits() {
  return (
    <div>
      <>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Social Media Audits</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Request New Audit</Button>
        </div>

        <div className="space-y-4">
          {mockSocialMediaEvaluations.map((evaluation) => (
            <Card key={evaluation.id} className="border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{evaluation.platform} Audit</CardTitle>
                    <CardDescription>Completed {evaluation.completedDate}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Score: {evaluation.score}/10</Badge>
                    <Badge variant="outline">${evaluation.billingAmount}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Findings:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {evaluation.findings.map((finding, index) => (
                        <li key={index} className="text-sm">
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {evaluation.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Evaluator:</strong> {evaluation.evaluator} •<strong> Status:</strong>{" "}
                      {evaluation.status}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </>
    </div>
  )
}
