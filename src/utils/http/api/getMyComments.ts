import { getMyCommentsApiUrl } from "../../../constants"
import useUserStore from "../../../stores/userStore"

interface getMyCommentsProps {}

interface getMyCommentOptions {
    id: number,
    content: string,
    user: {
        id: number,
        first_name: string,
        avatar: string,
        username: string
    },
    job: {
        id: number
        address: string
        title: string
        category: string
        city: string
        image: string
        rate: number
        rate_count: number
        discount: number
        lat: string
        lng: string
    },
    date: string
    time: string
    rate: number
    status: number
}

interface getMyCommentsOutPut {
    data: Array<getMyCommentOptions>
}

async function getMyComments({}: getMyCommentsProps):Promise<getMyCommentsOutPut> {
    const url = getMyCommentsApiUrl

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
    getMyComments
}

export type {
    getMyCommentsOutPut,
    getMyCommentOptions
}
