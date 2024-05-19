
import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import prisma from "@repo/db/client";

export async function getUserDetails() {
    const session = await getServerSession(authOptions);

    const userDetails = await prisma.user.findFirst({
        where: {
            id: Number(session.user.id)
    }});  

    if(userDetails){
        return {
            email: userDetails.email,
            name: userDetails.name,
            number: userDetails.number
        };
    }
}

export const DashboardDetails = async ()=>{
    const details = await getUserDetails();

    return <div>
        <Card title="Account Details">
            <div>
                <label className="font-semibold">Email: </label>
                {details?.email || "No email attached to account yet  "}
            </div>
            <div>
                <label className="font-semibold">Name: </label>
                 {details?.name?.toUpperCase() || "No username provided by user yet"}
            </div>
            <div>
                <label className="font-semibold">Mobile Number: </label>
                 {details?.number}
            </div>
        </Card>
    </div>
}