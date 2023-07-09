import { addOfferApiUrl } from "../../../constants";
import useUserStore from "../../../stores/userStore";

interface addOfferProps {
    content: string;
    extra?: string
}

interface addOfferOutPut {
    message: string;
}

async function addOffer({ content, extra="" }: addOfferProps):Promise<addOfferOutPut> {
    const url = addOfferApiUrl

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
    addOffer
}

export type {
    addOfferOutPut
}