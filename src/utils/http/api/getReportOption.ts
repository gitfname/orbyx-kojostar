import { getReportOptionsApiUrl } from "../../../constants";
import useUserStore from "../../../stores/userStore";

interface reportOptions {
    id: number;
    name: string;
}

interface getReportOptionsOutPut {
    data: Array<reportOptions>
}

async function getReportOptions():Promise<getReportOptionsOutPut> {
    const url = getReportOptionsApiUrl

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
    getReportOptions
}

export type {
    getReportOptionsOutPut
}