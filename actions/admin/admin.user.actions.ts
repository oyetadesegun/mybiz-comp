'use server'

import prisma from "@/prisma/client/client";


export async function getAllUSers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      lastLoggedIn: true
    },
  })
}
