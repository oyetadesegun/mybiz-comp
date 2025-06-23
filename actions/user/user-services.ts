'use server'

import prisma from "@/prisma/client";
import { User } from "@prisma/client";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user
}

export async function createUser(user: { email: string, name?: string }) {
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
    }
  })

  return newUser
}