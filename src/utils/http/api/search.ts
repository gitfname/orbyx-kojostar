import { searchApiUrl } from "../../../constants"
import useUserStore from "../../../stores/userStore"

interface searchOptions {
    id: number,
    address: string,
    title: string,
    category: string,
    city: string,
    image: string,
    rate: number,
    rate_count: number,
    discount: number,
    lat: number,
    lng: number
}

interface searchOutPut {
    data: Array<{
        id: number,
        address: string,
        title: string,
        category: string,
        city: string,
        image: string,
        rate: number,
        rate_count: number,
        discount: number,
        lat: number,
        lng: number
    }>
}

interface searchProps {
    type: 1 | 2 | 3 | 4,
    category_id?: number,
    city_id: Array<number>,
    lat?: number,
    lng?: number,
    key?: string
}

async function search({ key, type, category_id, city_id, lat, lng }:searchProps): Promise<searchOutPut> {
    const fetchOptions = {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + useUserStore.getState().user.token
        }
    }
    

    const data = await (await fetch(
        searchApiUrl+
        "?type="+type+
        (key?"&key="+key:"")+
        (category_id?"&category_id="+category_id:"")+
        (city_id ? "&city_id[]="+city_id.join("&city_id[]=") : "")+
        (lat?"&lat="+lat:"")+
        (lng?"&lng="+lng:""),
        fetchOptions
    )).json()

    return data
}

export {
    search
}

export type {
    searchProps,
    searchOptions
}