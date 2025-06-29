import prisma from "@/prisma/client/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(request: NextApiRequest, response: NextApiResponse){
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
        }});
        return response.status(200).json(users);
    } catch (error) {
        response.status(500).json({error: "Failed to fetch users"})
    }
}