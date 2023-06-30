import { getAddressApiUrl } from "../constants";


interface Props {
    lat: string;
    lng: string;
}

interface RootObject {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    place_rank: number;
    category: string;
    type: string;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: Address;
    boundingbox: string[];
}

interface Address {
    amenity: string;
    road: string;
    neighbourhood: string;
    city: string;
    district: string;
    county: string;
    state: string;
    'ISO3166-2-lvl4': string;
    postcode: string;
    country: string;
    country_code: string;
}

interface getAddressOutPut {
    data: RootObject
}

async function getAddress({ lat, lng }: Props): Promise<getAddressOutPut> {
    const url = getAddressApiUrl+"&lat="+lat+"&lon="+lng

    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch(url, fetchOptions)

    if (res.ok) {
        return {
            data: await res.json()
        }
    }
    else {
        throw new Error("something went wrong")
    }
}

export {
    getAddress
}

export type {
    getAddressOutPut
}