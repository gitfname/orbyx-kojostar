import { checkIsLoggedInApiUrl } from "../../../constants"

interface checkIsLoggedInProps {
    token: string
}

interface checkIsLoggedInOutPut {
    message: string,
    is_logged_in: boolean,
    status: number,
    role: number,
    user_id: number
}

async function checkIsLoggedIn({token}: checkIsLoggedInProps):Promise<checkIsLoggedInOutPut> {
    const url = checkIsLoggedInApiUrl

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
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
    checkIsLoggedIn
}

export type {
    checkIsLoggedInOutPut
}