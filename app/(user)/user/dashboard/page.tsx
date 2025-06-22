import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, DollarSign, MessageSquare, Phone, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function DashBoardOverview() {
  return (
    <div className=''>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-700 mb-8">Dashboard Overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues Submitted</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">67% resolution rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Social Media Audits</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Completed this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referral Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125</div>
            <p className="text-xs text-muted-foreground">From 5 referrals</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Social media audit completed</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-4 w-4 text-blue-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Customer experience call scheduled</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MessageSquare className="h-4 w-4 text-orange-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium">New business issue submitted</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/get-help">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Submit New Issue</Button>
            </Link>
            <Link href="/forum">
              <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                Browse Community
              </Button>
            </Link>
            <Link href="/referral">
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                Refer a Friend
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
