import { getUserInfoApiUrl } from "../../../constants"

interface getUserInfoProps {
    token: string
}

interface getUserInfoOutPut {
    is_logged_in: boolean
    data: {
        id: number,
        role: 1 | 2 | 3,
        first_name: string,
        last_name: string,
        username: string,
        phone_number: string,
        avatar: string,
        city: string,
        city_id: number
    }
}

async function getUserInfo({ token }: getUserInfoProps):Promise<getUserInfoOutPut> {

    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }

    const data = await fetch(getUserInfoApiUrl, fetchOptions);

    if(data.ok) {
        return await {
            is_logged_in: true,
            data: (await data.json()).data
        }
    }
    else {
        return {
            data: undefined,
            is_logged_in: false
        }
    }
}

export { getUserInfo }