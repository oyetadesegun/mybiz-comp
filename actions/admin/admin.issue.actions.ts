import prisma from "@/prisma/client";

export async function getAllIssues(){
    return prisma.getHelpQuestion.findMany()
}