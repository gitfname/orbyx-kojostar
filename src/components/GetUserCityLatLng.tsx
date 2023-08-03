
import { useEffect } from "react"
import useUserStore from "../stores/userStore"
import { getCityLatLng } from "../utils/http"
import { LatLng } from "leaflet"

function GetUserCityLatLng() {

    const [userCity, setUserLatLng] = useUserStore(selector => [selector.user.city, selector.api.setLatLng])

    useEffect(
        () => {            
            if(userCity) {
                getCityLatLng({name: userCity})
                .then(data => {
                    setUserLatLng(new LatLng(data.latitude, data.longitude))                    
                })
            }
        },
        [userCity]
    )

    return null
}

export default GetUserCityLatLng