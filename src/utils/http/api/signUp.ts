import { signUpApiUrl } from "../../../constants"
import useUserStore from "../../../stores/userStore"

interface signUpProps {
    first_name: string
    last_name: string
    city_id: number
    username: string
    avatar: File
}

interface signUpOutPut {
    message: string,
    user_id: number
}

async function signUp({ avatar, city_id, first_name, last_name, username }: signUpProps):Promise<signUpOutPut> {
    const url = signUpApiUrl

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + useUserStore.getState().user.token
        },
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            city_id: city_id,
            username: username,
            avatar: undefined
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
    signUp
}

export type {
    signUpOutPut
}