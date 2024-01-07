import { prisma } from "@/prisma/prisma"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    const input = await req.json() as { name: string, description: string, file: string }
    const file = Buffer.from(input.file);
    const result = await prisma.story.create({
        data: {
            description: input.description,
            name: input.name,
            file
        }
    })
    return new NextResponse(JSON.stringify(result), {
        status: 200
    })
}

export const GET = async (req: NextRequest) => {
    const stories = await prisma.story.findMany()
    return new NextResponse(JSON.stringify(stories), {
        status: 200
    })
}