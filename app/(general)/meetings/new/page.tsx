"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MicOff, VideoIcon, VideoOff, ScreenShare, Phone } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import { mockGroups } from "@/lib/mock-data"

export default function NewMeetingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const groupId = searchParams.get("groupId")

  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [participants, setParticipants] = useState([
    { id: "you", name: "You", avatar: "/placeholder.svg?height=40&width=40", isSelf: true },
    { id: "p1", name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "p2", name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40" },
  ])

  const videoRef = useRef<HTMLVideoElement>(null)

  // Find the group if groupId is provided
  const group = groupId ? mockGroups.find((g) => g.id === groupId) : null

  // Simulate video stream
  useEffect(() => {
    if (videoRef.current && isVideoOn) {
      // In a real app, this would use WebRTC to get the user's camera
      // For this demo, we'll just show a placeholder
      videoRef.current.poster = "/placeholder.svg?height=480&width=640"
    }
  }, [isVideoOn])

  const handleEndCall = () => {
    router.push("/meetings")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 overflow-hidden p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl h-full flex flex-col">
          <div className="mb-4">
            <h1 className="text-2xl font-bold tracking-tight">{group ? `${group.name} Meeting` : "New Meeting"}</h1>
            <p className="text-sm text-muted-foreground">{new Date().toLocaleString()}</p>
          </div>

          <div className="flex-1 overflow-hidden grid grid-rows-[1fr,auto] gap-4">
            <div className="bg-black rounded-lg overflow-hidden relative">
              {isVideoOn ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="/placeholder.svg?height=480&width=640"
                  muted
                  playsInline
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="You" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                </div>
              )}

              <div className="absolute bottom-4 left-4 flex gap-2">
                <Card className="bg-black/50 border-0 text-white p-2">
                  <span className="text-xs">You</span>
                </Card>
              </div>

              {participants.length > 1 && (
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {participants
                    .filter((p) => !p.isSelf)
                    .map((participant) => (
                      <div key={participant.id} className="w-32 h-24 bg-gray-800 rounded-lg overflow-hidden relative">
                        <Avatar className="absolute inset-0 w-full h-full rounded-none">
                          <AvatarImage
                            src={participant.avatar || "/placeholder.svg"}
                            alt={participant.name}
                            className="object-cover"
                          />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-1 left-1 right-1">
                          <Card className="bg-black/50 border-0 text-white p-1">
                            <span className="text-xs">{participant.name}</span>
                          </Card>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="flex justify-center items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
              <Button
                variant={isMicOn ? "outline" : "destructive"}
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={() => setIsMicOn(!isMicOn)}
              >
                {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              <Button
                variant={isVideoOn ? "outline" : "destructive"}
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              <Button
                variant={isScreenSharing ? "default" : "outline"}
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={() => setIsScreenSharing(!isScreenSharing)}
              >
                <ScreenShare className="h-5 w-5" />
              </Button>
              <Button variant="destructive" size="icon" className="h-12 w-12 rounded-full" onClick={handleEndCall}>
                <Phone className="h-5 w-5 rotate-135" />
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <Tabs defaultValue="chat">
              <TabsList className="w-full">
                <TabsTrigger value="chat" className="flex-1">
                  Chat
                </TabsTrigger>
                <TabsTrigger value="participants" className="flex-1">
                  Participants ({participants.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="mt-2">
                <Card>
                  <CardContent className="p-4 h-48 overflow-y-auto">
                    <div className="space-y-4">
                      <p className="text-center text-sm text-muted-foreground">Meeting started</p>
                      <div className="flex items-start gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sarah Johnson" />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Sarah Johnson</span>
                            <span className="text-xs text-muted-foreground">Just now</span>
                          </div>
                          <p className="text-sm">Hi everyone! Glad we could all make it today.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <form className="flex w-full gap-2">
                      <Input placeholder="Type a message..." className="flex-1" />
                      <Button type="submit">Send</Button>
                    </form>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="participants" className="mt-2">
                <Card>
                  <CardContent className="p-4 h-48 overflow-y-auto">
                    <div className="space-y-2">
                      {participants.map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                              <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                              {participant.name} {participant.isSelf && "(You)"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <VideoIcon className="h-4 w-4 text-muted-foreground" />
                            <Mic className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
