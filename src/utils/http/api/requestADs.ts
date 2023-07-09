import { RequestAdsApiUrl } from "../../../constants";
import useUserStore from "../../../stores/userStore";

interface requestADsProps {
    content: string;
    extra?: string;
}

interface requestADsOutPut {
    message: string
}

async function requestADs({ content, extra="" }: requestADsProps):Promise<requestADsOutPut> {
    const url = RequestAdsApiUrl

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + useUserStore.getState().user.token
        },
        body: JSON.stringify({
            content: content,
            extra: extra
        })
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
    requestADs
}

export type {
    requestADsOutPut
}