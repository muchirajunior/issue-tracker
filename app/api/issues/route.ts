import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";
import { revalidatePath } from "next/cache";

export async function GET() {
    var issues = await prisma.issue.findMany();
    return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validate = issueSchema.safeParse(body);
    if(!validate.success)return NextResponse.json(validate.error.format(),{ status : 400})
    
    var issues = await prisma.issue.create({
        data : {title: body.title, description: body.description}
    })
    revalidatePath('/');
    return NextResponse.json(issues, {status: 201})
}