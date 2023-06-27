import { toggleBookMarkApiUrl } from "../../../constants"
import useUserStore from "../../../stores/userStore"

interface toggleBookMarkProps {
    job_id: number
}

interface toggleBookMarkOutPut {
    message: string
    is_bookmarked: boolean
}

async function toggleBookMark({ job_id }: toggleBookMarkProps):Promise<toggleBookMarkOutPut> {
    const url = toggleBookMarkApiUrl + "?job_id="+job_id

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+useUserStore.getState().user.token
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
    toggleBookMark
}

export type {
    toggleBookMarkOutPut
}