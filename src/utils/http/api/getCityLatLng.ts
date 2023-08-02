import { getCityLatLngApiUrl } from "../../../constants";

interface getCityLatLngProps {
    name: string;
}

interface getCityLatLngOutPut {
    id: number;
    title: string;
    slug: string;
    province_id: number;
    latitude: number;
    longitude: number;
}

async function getCityLatLng({ name }: getCityLatLngProps):Promise<getCityLatLngOutPut> {
    const url = getCityLatLngApiUrl+"?city="+name

    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
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
    getCityLatLng
}

export type {
    getCityLatLngOutPut
}