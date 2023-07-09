import { suggestAddNewPlaceApiUrl } from "../../../constants";
import useUserStore from "../../../stores/userStore";

interface suggestAddNewPlaceProps {
    content: string;
    extra?: string;
}

interface suggestAddNewPlaceOutPut {
    message: string;
}

async function suggestAddNewPlace({ content, extra="" }: suggestAddNewPlaceProps):Promise<suggestAddNewPlaceOutPut> {
    const url = suggestAddNewPlaceApiUrl

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
    suggestAddNewPlace
}

export type {
    suggestAddNewPlaceOutPut
}