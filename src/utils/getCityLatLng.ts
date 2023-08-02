import { citiesJsonFIle } from "../constants";

interface CityProps {
    id: number;
    name: string;
    lat: number;
    lng: number;
}

interface CitiesJsonFileProps {
    id: number;
    cities: Array<CityProps>
}

interface getCityLatLngOutPut {
    name: string;
    lat: number;
    lng: number;
}

function getCity(data: Array<CitiesJsonFileProps>, id: number) {
    let result: getCityLatLngOutPut = {
        lat: undefined,
        lng: undefined,
        name: undefined
    }

    data.forEach(state => {
        const res = state.cities.find(city => city.id === id)
        if (res) {
            result = res
        }
    })

    return result
}

async function getCityLatLng_utility(city_id: number): Promise<getCityLatLngOutPut> {
    if ("cities_states_json" in window) {
        return getCity(window["cities_states_json"] as Array<CitiesJsonFileProps>, city_id)
    }

    const res = await fetch(citiesJsonFIle)

    if (res.ok) {
        const data: Array<CitiesJsonFileProps> = await res.json();
        window["cities_states_json"] = data
        return getCity(data, city_id)
    }
    else {
        throw new Error("something went wrong while getting CitiesJson file")
    }
}

export {
    getCityLatLng_utility
}