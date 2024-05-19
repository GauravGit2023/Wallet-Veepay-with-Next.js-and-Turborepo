
import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { RecentP2pTransfers } from "../../../components/RecentP2pTransfers";
import { authOptions } from "../../../lib/auth";

async function getRecentP2pTransfers() {
    const session = await getServerSession(authOptions);

    const transfers = await prisma.p2pTransfer.findMany({
        where: {
            OR:[
                { fromUserId: Number(session.user.id) },
                { toUserId: Number(session.user.id) }
            ]
        }
    });  

    return transfers.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        toUserId: t.toUserId || 0,
        fromUserId: t.fromUserId || 0
    }))
}

export default async function (){
    const transfers = await getRecentP2pTransfers();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            P2P-Transfers
        </div>
        <div className="py-3">
            <SendCard />
        </div>
        <div className="px-3">
            <RecentP2pTransfers transfers={transfers} />
        </div>
    </div>
}