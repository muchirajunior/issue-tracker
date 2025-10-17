import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";

const issueSchema = z.object({
    title : z.string().min(1).max(255),
    description:  z.string().min(1).max(255)
})

export async function GET() {
    var issues = await prisma.issue.findMany();
    return NextResponse.json(issues);
}


export async function POST(request: NextRequest) {
    const body = await request.json();
    const validate = issueSchema.safeParse(body);
    if(!validate.success)return NextResponse.json(validate.error.flatten(),{ status : 400})
    
    var issues = await prisma.issue.create({
        data : {title: body.title, description: body.description}
    })
    return NextResponse.json(issues, {status: 201})
}