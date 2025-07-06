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
      lastLoggedIn: true,
      status: true,
      avatar: true,
      password: true
    },
    
  })
}

    // Fetch user data directly in the server component
    export  async function findUserById(userId: string){
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: {
          profile: true,
          customerResponses: {
            include:{
              question: true
            }
          },
          staffResponses: true,
          
        }
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
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as Role;
  const status = formData.get("status") as UserStatus;
  const avatar = formData.get("avatar") as string;

  try {
    // Step 1: Update the user
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        role,
        status,
        avatar,
      },
    });

    // Step 2: Get the user's profile
    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
    });

    // Step 3: If profile exists, update all issues related to it
    if (profile) {
      await prisma.getHelpQuestion.updateMany({
        where: { profileId: profile.id },
        data: {
          fullName: name,
          emailAddress: email,
        },
      });
    }
  } catch (error) {
    console.error("UpdateUser error:", error);
    throw new Error("Failed to update user and related issues");
  }
}
