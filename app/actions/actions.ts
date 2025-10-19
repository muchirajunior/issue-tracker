'use server';

import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function updateIssue(issue:Issue) : Promise<string | null> {
    try {
        issue.updatedAt = new Date();
        await prisma.issue.update({
            where:{ id: issue.id },
            data:issue
        });
        revalidatePath('/')
        return null;
    } catch (error) {
        return `Error updating issue ${error}`;
    }
}

export async function deleteIssue(id: number): Promise<string | null> {
    try {
        await prisma.issue.delete({
            where: { id }
        });
        revalidatePath('/');
        return null;
    } catch (error) {
        return `Error deleting issue: ${error}`;
    }
}
