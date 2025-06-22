"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import type { ResponseType } from "@/lib/types"

interface ResponseCardProps {
  response: ResponseType
}

export default function ResponseCard({ response }: ResponseCardProps) {
  const [upvotes, setUpvotes] = useState(response.upvotes)
  const [downvotes, setDownvotes] = useState(response.downvotes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)

  const handleUpvote = () => {
    if (userVote === "up") {
      setUpvotes(upvotes - 1)
      setUserVote(null)
    } else {
      if (userVote === "down") {
        setDownvotes(downvotes - 1)
      }
      setUpvotes(upvotes + 1)
      setUserVote("up")
    }
  }

  const handleDownvote = () => {
    if (userVote === "down") {
      setDownvotes(downvotes - 1)
      setUserVote(null)
    } else {
      if (userVote === "up") {
        setUpvotes(upvotes - 1)
      }
      setDownvotes(downvotes + 1)
      setUserVote("down")
    }
  }

  return (
    <Card className="border-[#E2E8F0] shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border border-[#E2E8F0]">
            <AvatarImage src={response.author.avatar || "/placeholder.svg"} alt={response.author.name} />
            <AvatarFallback className="bg-[#7E69AB]/10 text-[#7E69AB]">{response.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#2D3748]">{response.author.name}</span>
                {response.author.company && <span className="text-sm text-[#4A5568]">• {response.author.company}</span>}
              </div>
              <span className="text-sm text-[#4A5568]">{response.date}</span>
            </div>
            <div className="space-y-4">
              <p className="text-[#4A5568]">{response.content}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-[#E2E8F0] pt-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${userVote === "up" ? "text-[#7E69AB]" : "text-[#4A5568]"} hover:text-[#7E69AB] hover:bg-[#F7F5FF]`}
            onClick={handleUpvote}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{upvotes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${userVote === "down" ? "text-red-500" : "text-[#4A5568]"} hover:text-red-500 hover:bg-red-50`}
            onClick={handleDownvote}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{downvotes}</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-[#4A5568] hover:text-[#7E69AB] hover:bg-[#F7F5FF]"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Reply</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
