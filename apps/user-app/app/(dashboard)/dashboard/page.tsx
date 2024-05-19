import { DashboardDetails } from "../../../components/DashboardDetails";
import { UpdateDetails } from "../../../components/UpdateDetails";


export default async function Page(){
    
    return <div>
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Dashboard
        </div>
        <DashboardDetails />
        <UpdateDetails />
    </div>
}