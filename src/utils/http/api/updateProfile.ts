import { updateProfileApiUrl } from "../../../constants"
import useUserStore from "../../../stores/userStore"

interface updateProfileProps {
    first_name: string,
    last_name: string,
    username: string,
    avatar?: File | string;
}

interface updateProfileOutPut {
    data: {
        id: number,
        role: number,
        first_name: string,
        last_name: string,
        username: string,
        phone_number: string,
        avatar: string,
        city: string,
        city_id: number
    }
}

async function updateProfile({
    first_name, last_name, username, avatar
}: updateProfileProps): Promise<updateProfileOutPut> {
    const url = updateProfileApiUrl

    const form = new FormData();
    form.append("first_name", first_name)
    form.append("last_name", last_name)
    form.append("username", username)

    typeof avatar === "string"
        ?
        form.append("avatar", avatar)
        :
        avatar === null
            ?
            form.append("avatar", null)
            :
            form.append("avatar", avatar, avatar.name)



    const fetchOptions = {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + useUserStore.getState().user.token
        },
        body: form
    }

    const res = await fetch(url, fetchOptions)

    if (res.ok) {
        return await res.json()
    }
    else {
        throw new Error("something went wrong")
    }
}

export {
    updateProfile
}

export type {
    updateProfileOutPut
}