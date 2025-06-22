export interface UserType {
  id: string
  name: string
  avatar: string
  company?: string
}

export interface QuestionType {
  id: string
  title: string
  content: string
  date: string
  category: string
  author: UserType
  responseCount: number
  upvotes: number
  isPublic: boolean
  isAnonymous: boolean
  isOwn?: boolean
  hasAnswered?: boolean
  isSaved?: boolean
}

export interface ResponseType {
  id: string
  content: string
  date: string
  author: UserType
  upvotes: number
  downvotes: number
  isAccepted?: boolean
}
