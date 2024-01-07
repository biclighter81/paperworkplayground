import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
    const { id, favorite } = await req.json() as { id: string, favorite: boolean }
    const result = await prisma.story.update({
        where: { id },
        data: {
            favorite
        }
    })
    return new NextResponse(JSON.stringify(result), {
        status: 200
    })
}