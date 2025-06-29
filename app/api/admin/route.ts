// app/api/admin/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/prisma/client/client'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
