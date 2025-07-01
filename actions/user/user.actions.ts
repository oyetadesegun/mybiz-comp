'use server'

import prisma from "@/prisma/client";
import { User } from "@prisma/client";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user
}

export async function createUser(user: { email: string, name?: string, password?: string, avatar?: string }) {
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
      avatar: user.avatar
    }
  })

  return newUser
}

export async function updateLastLoggedIn(userId: string) {
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      lastLoggedIn: new Date()
    }
  })
} 