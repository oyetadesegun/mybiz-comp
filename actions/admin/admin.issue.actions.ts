import prisma from "@/prisma/client";

export async function getAllIssues(){
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const [totalCount, thisMonthCount, allIssues] = await Promise.all([
        prisma.getHelpQuestion.count(),prisma.getHelpQuestion.count({
            where:{
                createdAt: {
                    gte: startOfMonth
                }
            }
        }),prisma.getHelpQuestion.findMany()
    ])
    return {totalCount, thisMonthCount, allIssues}
}
export async function getIssueById({issueId}: {issueId: string}){
const issue = prisma.getHelpQuestion.findUnique({
    where: {
        id: issueId
    },
    include: {
        documents: true,
        responses:{
           include:{
            staff: true,
            customer: true
           } 
        }
    },

})
return issue
}
export  async function deleteIssue({issueId}: {issueId: string}){
const issue = await prisma.getHelpQuestion.delete({
    where: {
        id: issueId
    }
})
  return issue  
}