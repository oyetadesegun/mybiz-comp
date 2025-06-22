'use client'

import { AvatarFallback } from "@radix-ui/react-avatar"
import { Avatar, AvatarImage } from "../ui/avatar"
import { useSession } from 'next-auth/react'

export default function ProfileAvatar() {

  const { data: session, status } = useSession()

  const imageUrl = session?.user.image as string

  return (
    <Avatar className="h-9 w-9">
      <AvatarImage src={imageUrl} alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
}
