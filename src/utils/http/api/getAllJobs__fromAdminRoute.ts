import { getAllJobs__fromAdminRouteApiUrl } from "../../../constants";
import useUserStore from "../../../stores/userStore";


interface JobOptions {
    id: number;
    address: string;
    title: string;
    category: string;
    city: string;
    image: string;
    rate: number;
    rate_count: number;
    discount: number;
    status: number;
    user_id: number;
}

interface getAllJobsFromAdminRouteOutPut {
    data: Array<JobOptions>
}

async function getAllJobsFromAdminRoute():Promise<getAllJobsFromAdminRouteOutPut> {
    const url = getAllJobs__fromAdminRouteApiUrl

    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + useUserStore.getState().user.token
        }
    }

    const res = await fetch(url, fetchOptions)

    if(res.ok) {
        return await res.json()
    }
    else {
        throw new Error("something went wrong")
    }
}

export {
    getAllJobsFromAdminRoute
}

export type {
    getAllJobsFromAdminRouteOutPut
}