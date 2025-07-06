'use server'

import prisma from "@/prisma/client";
import { User, UserStatus } from "@prisma/client";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user
}

export async function createUser(user: { email: string, name?: string, password?: string, avatar?: string, status?: UserStatus }) {
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
      avatar: user.avatar || '/placeholder-user.jpg',
      status: user.status
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

export default async function deleteUser(userId: string) {
  await prisma.user.delete({
    where: {
      id: userId
    }
  })
}