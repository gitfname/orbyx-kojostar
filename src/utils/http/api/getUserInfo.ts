import { getUserInfoApiUrl } from "../../../constants"

interface getUserInfoProps {
    token: string
}

interface getUserInfoOutPut {
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

    const data = await (await fetch(getUserInfoApiUrl, fetchOptions)).json();
    return data
}

export { getUserInfo }