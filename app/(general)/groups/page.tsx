"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, Search, Users } from "lucide-react"
import { mockGroups } from "@/lib/mock-data"
import DashboardHeader from "@/components/dashboard-header"

export default function GroupsPage() {
  const [groups, setGroups] = useState(mockGroups)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredGroups = groups.filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()))

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
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                >
                  <span>Groups</span>
                </Link>
                <Link
                  href="/meetings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
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
              <h1 className="text-2xl font-bold tracking-tight">Groups</h1>
              <Link href="/groups/create">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Group
                </Button>
              </Link>
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="my-groups">
              <TabsList>
                <TabsTrigger value="my-groups">My Groups</TabsTrigger>
                <TabsTrigger value="discover">Discover</TabsTrigger>
              </TabsList>
              <TabsContent value="my-groups" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredGroups
                    .filter((group) => group.isMember)
                    .map((group) => (
                      <Link href={`/groups/${group.id}`} key={group.id}>
                        <Card className="h-full hover:bg-gray-50 transition-colors">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle>{group.name}</CardTitle>
                              {group.isPrivate && <Badge variant="outline">Private</Badge>}
                            </div>
                            <CardDescription>{group.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{group.memberCount} members</span>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <div className="flex -space-x-2">
                              {group.recentMembers.map((member, i) => (
                                <Avatar key={i} className="h-8 w-8 border-2 border-background">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                </div>
                {filteredGroups.filter((group) => group.isMember).length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Users className="h-12 w-12 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium">No groups yet</h3>
                      <p className="text-sm text-gray-500">You haven&apos;t joined any groups yet.</p>
                      <Button className="mt-4" asChild>
                        <Link href="/groups?tab=discover">Discover groups</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="discover" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredGroups
                    .filter((group) => !group.isMember && !group.isPrivate)
                    .map((group) => (
                      <Card key={group.id} className="h-full">
                        <CardHeader className="pb-2">
                          <CardTitle>{group.name}</CardTitle>
                          <CardDescription>{group.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{group.memberCount} members</span>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" className="w-full">
                            Join Group
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
                {filteredGroups.filter((group) => !group.isMember && !group.isPrivate).length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Users className="h-12 w-12 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium">No groups found</h3>
                      <p className="text-sm text-gray-500">Try adjusting your search or create a new group.</p>
                      <Button className="mt-4" asChild>
                        <Link href="/groups/create">Create a group</Link>
                      </Button>
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
