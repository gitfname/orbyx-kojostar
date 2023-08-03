
import { getCitiesAndStates } from "./http"
import { getCitiesAndStatesOutPutTest } from "./http/api/getCitiesAndStates"

let citiesStates: getCitiesAndStatesOutPutTest = undefined;

async function loadCitisStates(): Promise<boolean> {
    if (typeof citiesStates === "undefined") {
        citiesStates = await getCitiesAndStates()
        return true
    }
    return true
}

function getCityStateNameById(id: number): string | 0 {
    if (citiesStates?.data) {
        const value = citiesStates.data.find(item => item.id === id).name
        if (typeof value === "undefined") {
            return 0
        }
        return value
    }
}


export {
    loadCitisStates,
    getCityStateNameById
}