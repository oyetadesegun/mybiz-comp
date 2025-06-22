import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MessageSquare, ThumbsUp } from "lucide-react"
import type { QuestionType } from "@/lib/types"

interface QuestionCardProps {
  question: QuestionType
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card className="border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8 border border-[#E2E8F0]">
            <AvatarImage src={question.author.avatar || "/placeholder.svg"} alt={question.author.name} />
            <AvatarFallback className="bg-[#7E69AB]/10 text-[#7E69AB]">{question.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none text-[#2D3748]">
              {question.isAnonymous ? "Anonymous" : question.author.name}
            </p>
            <p className="text-xs text-[#4A5568]">{question.date}</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-[#F7F5FF] text-[#7E69AB] border-[#7E69AB]">
          {question.category}
        </Badge>
      </CardHeader>
      <CardContent>
        <Link href={`/question/${question.id}`} className="hover:underline">
          <h3 className="font-semibold text-lg mb-2 text-[#2D3748]">{question.title}</h3>
        </Link>
        <p className="text-sm text-[#4A5568] line-clamp-2">{question.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-[#4A5568]">
          <MessageSquare className="mr-1 h-4 w-4 text-[#7E69AB]" />
          {question.responseCount} responses
        </div>
        <div className="flex items-center text-sm text-[#4A5568]">
          <ThumbsUp className="mr-1 h-4 w-4 text-[#7E69AB]" />
          {question.upvotes} upvotes
        </div>
      </CardFooter>
    </Card>
  )
}
