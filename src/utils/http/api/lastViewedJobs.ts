import { getLastViewedJobsApiUrl } from "../../../constants"
import useUserStore from "../../../stores/userStore"

interface lastViewedJobsOutPut {
    "data": Array<{
        id: number,
        address: string,
        title: string,
        category: string,
        city: string,
        image: string,
        rate: number,
        rate_count: number,
        discount: number,
        lat: string,
        lng: string
    }>
}

async function lastViewedJobs(): Promise<lastViewedJobsOutPut> {

    const fetchOptions = {
        method: "GET",
        headers: {
            "Authorization": "Bearer" + useUserStore.getState().user.token,
            "Content-Type": "application/json"
        }
    }

    const res = await fetch(getLastViewedJobsApiUrl, fetchOptions)

    if(res.ok) {
        return await res.json()
    }
    else {
        throw new Error("something went wrong while getting last viewed jobs")
    }
}

export {
    lastViewedJobs
}

export type {
    lastViewedJobsOutPut
}