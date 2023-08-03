
import { getCitiesAndStatesApiUrl } from "../../../constants";
import useUserStore from "../../../stores/userStore";

interface getCitiesAndStatesOptions {
    id: number,
    name: string,
    cities: Array<{
        id: number,
        state_id: number,
        name: string
    }>
}

interface getCitiesAndStatesOutPut {
    data: Array<getCitiesAndStatesOptions>
}

interface getCitiesAndStatesOptionsTest {
    id: number,
    is_state: boolean
    state_id: number
    name: string,
    is_parent: boolean
}

interface getCitiesAndStatesOutPutTest {
    data?: Array<getCitiesAndStatesOptionsTest>
}

async function getCitiesAndStates(): Promise<getCitiesAndStatesOutPutTest> {

    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + useUserStore.getState().user.token
        }
    }

    const data:getCitiesAndStatesOutPut = await (await fetch(
        getCitiesAndStatesApiUrl,
        fetchOptions
    )).json();
    

    let d:getCitiesAndStatesOutPutTest = {
        data: []
    }
    

    data.data.forEach((state , _) => {
        d.data.push({
            id: state.id,
            is_state: true,
            name: state.name,
            state_id: undefined,
            is_parent: true
        })

        state.cities.forEach((city, _) => {
            d.data.push({
                id: city.id,
                name: city.name,
                is_state: false,
                state_id: state.id,
                is_parent: false
            })
        })
        
    }) 

    return d
}

export {
    getCitiesAndStates
}

export type {
    getCitiesAndStatesOutPutTest,
    getCitiesAndStatesOptions,
    getCitiesAndStatesOptionsTest
}