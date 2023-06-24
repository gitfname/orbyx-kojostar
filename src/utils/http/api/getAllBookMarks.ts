import { getAllBookMarksApiUrl } from "../../../constants";
import useUserStore from "../../../stores/userStore";

interface getAllBookMarksOutPut {
    data: Array<{
        id: number,
        address: string,
        title: string,
        category: string,
        city: string,
        image: string,
        rate: number,
        rate_count: number,
        discount: number,
        lat: number,
        lng: number
    }>
}

async function getAllBookMarks(): Promise<getAllBookMarksOutPut> {
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + useUserStore.getState().user.token
        }
    }

    const res = await fetch(getAllBookMarksApiUrl, fetchOptions)

    if(res.ok) {
        return await res.json()
    }
    else {
        switch (res.status) {
            case 404: throw new Error("not found")
            default: throw new Error("unknown error")
        }
    }
}

export {
    getAllBookMarks
}