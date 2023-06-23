
import { getHomeDataApiUrl } from "../../../constants"
import useUserStore from "../../../stores/userStore"

interface getHomeDataOutput {
    special: Array<any>,
    popular: Array<any>
}

async function getHomeData(): Promise<getHomeDataOutput> {
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + useUserStore.getState().user.token
        }
    }

    const data = await (await fetch(getHomeDataApiUrl, fetchOptions)).json()
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data)
        }, 3000);
    })
}

export {
    getHomeData
}