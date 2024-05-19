"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function updateEmail(email?: string, name?: string){
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    if(!userId){
        return {
            message: "User Not logged in"
        }
    }

    await prisma.user.update({
        where: {
            id: Number(session.user.id)
        },
        data: {
            email: email,
            name: name
        }
    });

    return {
        message: "email updated successfully"
    }
}