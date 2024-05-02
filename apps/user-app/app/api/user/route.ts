import db from "@repo/db/client"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";

export const GET = async () => {
    // await client.user.create({
    //     data:{
    //         email: "gfdhg@gmail.com",
    //         name: "gfdhfg"
    //     }
    // })

    const session = await getServerSession(authOptions);
    if(session.user){
        return NextResponse.json({
            user: session.user
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    },{
        status: 403
    })
}