import { updateCityIdApiUrl } from "../../../constants"
import useUserStore from "../../../stores/userStore"

interface updateCityProps {
    city_id: number
}

interface updateCityOutPut {
    data: {
        id: number
        role: number
        first_name:string
        last_name: string
        username: string
        phone_number: string
        avatar: string
        city: string,
        city_id: number
    }
}

async function updateCity({ city_id }: updateCityProps): Promise<updateCityOutPut> {

    const fetchOptions = {
        method: "POST",
        headers: {
            "Authorization": "Bearer" + useUserStore.getState().user.token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "city_id": city_id
        })
    }

    const res = await fetch(updateCityIdApiUrl, fetchOptions)

    if(res.ok) {
        return await res.json()
    }
    else {
        throw new Error("something went wrong while updating city_id")
    }
}

export {
    updateCity
}