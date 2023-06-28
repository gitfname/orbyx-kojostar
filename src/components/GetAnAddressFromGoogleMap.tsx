
import {
    GoogleMap,
    useLoadScript,
    Marker
} from "@react-google-maps/api"
import { useMemo } from "react"

function GetAnAddressFromGoogleMap() {

    const initialPos = useMemo(() => ({lat: 40, lng: 80}), [])
    

    return (
        <GoogleMap
        >

        </GoogleMap>
    )
}

export default GetAnAddressFromGoogleMap