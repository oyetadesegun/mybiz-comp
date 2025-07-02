'use server'

import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Role, UserStatus } from "@prisma/client";

export async function getAllUsers() {
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

    // Fetch user data directly in the server component
    export  async function findUserById(userId: string){
    const user = await prisma.user.findUnique({
        where: {id: userId}
    })
    if(!user){
        notFound()
    }
    return user
  }
    export  async function findUserByEmail(email: string){
    const user = await prisma.user.findUnique({
        where: {email}
    })
    if(!user){
        notFound()
    }
    return user
  }


   export async function UpdateUser(formData: FormData, userId: string) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                role: formData.get('role') as Role,
                status: formData.get('status') as UserStatus,
                avatar: formData.get('avatar') as string
            }
        });
    } catch (error) {
        throw new Error('Failed to update user');
    }
}
