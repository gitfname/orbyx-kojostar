import { getSingleGuestJobApiUrl } from "../../../constants"

interface getSingleGuestJobProps {
    jobId: number
}

interface getSingleGuestJobOutPut {
    job: {
        id: number,
        title: string,
        description: string,
        address: string,
        city: string,
        categories: Array<{
            id: number,
            name: string
        }>,
        lat: number,
        lng: number,
        phones: Array<string>,
        rate: number,
        rate_count: number,
        medias: Array<{
            type: string,
            url: string
        }>,
        hashtags: Array<string>,
        discount: number
    },
    plan: Array<{
        day: number,
        start_morning_time: string,
        end_morning_time: string,
        start_afternoon_time: string,
        end_afternoon_time: string,
        is_holiday: boolean
    }>,
    comments: Array<{
        id: number,
        content: string,
        user: {
            id: number,
            first_name: string,
            avatar: string,
            username: string
        },
        date: string,
        time: string,
        rate: number,
        status: number
    }>
}

async function getSingleGuestJob({jobId}: getSingleGuestJobProps):Promise<getSingleGuestJobOutPut> {

    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch(getSingleGuestJobApiUrl+"?id="+jobId, fetchOptions);

    if(res.ok) {
        return await res.json()
    }
    else if (res.status === 404) {
        throw new  Error("not found")
    }
    else {
        throw new Error("unknown error")
    }

}

export {
    getSingleGuestJob
}

export type {
    getSingleGuestJobOutPut
}