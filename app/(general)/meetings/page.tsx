"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video } from "lucide-react"
import { mockMeetings } from "@/lib/mock-data"
import DashboardHeader from "@/components/dashboard-header"

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState(mockMeetings)

  // Filter meetings into upcoming and past
  const upcomingMeetings = meetings.filter((meeting) => !meeting.isPast)
  const pastMeetings = meetings.filter((meeting) => meeting.isPast)

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 dark:bg-gray-900 lg:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <span>Questions</span>
                </Link>
                <Link
                  href="/groups"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <span>Groups</span>
                </Link>
                <Link
                  href="/meetings"
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                >
                  <span>Meetings</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <span>Profile</span>
                </Link>
              </nav>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Meetings</h1>
              <Button asChild>
                <Link href="/meetings/new">
                  <Video className="mr-2 h-4 w-4" />
                  New Meeting
                </Link>
              </Button>
            </div>

            <Tabs defaultValue="upcoming">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="space-y-4 pt-4">
                {upcomingMeetings.length > 0 ? (
                  upcomingMeetings.map((meeting) => (
                    <Card key={meeting.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{meeting.title}</CardTitle>
                            <CardDescription>{meeting.group}</CardDescription>
                          </div>
                          <Badge variant="outline">{meeting.duration} min</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{meeting.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{meeting.time}</span>
                          </div>
                        </div>
                        {meeting.description && (
                          <p className="mt-2 text-sm text-muted-foreground">{meeting.description}</p>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="mr-2">
                          View Details
                        </Button>
                        <Button>
                          <Video className="mr-2 h-4 w-4" />
                          Join Meeting
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Video className="h-12 w-12 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium">No upcoming meetings</h3>
                      <p className="text-sm text-gray-500">You don&apos;t have any scheduled meetings.</p>
                      <Button className="mt-4" asChild>
                        <Link href="/meetings/new">Schedule a meeting</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="past" className="space-y-4 pt-4">
                {pastMeetings.length > 0 ? (
                  pastMeetings.map((meeting) => (
                    <Card key={meeting.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{meeting.title}</CardTitle>
                            <CardDescription>{meeting.group}</CardDescription>
                          </div>
                          <Badge variant="outline">{meeting.duration} min</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{meeting.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{meeting.time}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline">View Recording</Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Video className="h-12 w-12 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium">No past meetings</h3>
                      <p className="text-sm text-gray-500">You haven&apos;t attended any meetings yet.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
