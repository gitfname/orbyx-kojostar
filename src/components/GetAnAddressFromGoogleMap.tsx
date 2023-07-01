
import { LatLng } from 'leaflet'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'
import { getAddress } from '../utils/getAddress'

interface getCurrentPositionProps {
    successCallBack?(pos: GeolocationPosition): void,
    errorCallBack?(err: GeolocationPositionError): void,
}

function getGeoLocation({ errorCallBack = undefined, successCallBack = undefined }: getCurrentPositionProps) {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(
            (pos) => {
                if (successCallBack) successCallBack(pos)
            },
            (err) => {
                if (errorCallBack) errorCallBack(err)
            }
        )
    }
}


interface GetCLicickedCordinates {
    setPos(data: LatLng): void
}

function GetCLicickedCordinates({ setPos }: GetCLicickedCordinates) {
    const map = useMapEvents({
        click: e => {
            setPos(e.latlng)
        }
    })

    return null
}

interface Props {
    clickedtAddress?(data: string): void;
    onClick(data: LatLng): void;
    latlng?: LatLng
}

function GetAnAddressFromGoogleMap({ clickedtAddress, onClick = undefined, latlng = undefined }: Props) {

    const [clickedPos, setClickedPos] = useState<LatLng>(undefined)
    const [address, setAddress] = useState<string>("")

    useEffect(
        () => {
            if (address && clickedtAddress) clickedtAddress(address)
        },
        [address]
    )

    return (
        <MapContainer
            center={[37.5564892, 45.0655156]}
            zoom={4}
            scrollWheelZoom={false}
            style={{
                width: "100%",
                height: "400px",
                borderRadius: "12px"
            }}
            className='shadow-md shadow-black/10'
        >

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {/* <Marker position={latlng ? latlng : [55.5564892, 105.0655156]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}

            {
                latlng
                    ?
                    <Marker position={latlng} />
                    : null
            }


            {
                clickedPos && !latlng
                    ?
                    <Marker
                        position={[clickedPos.lat, clickedPos.lng]}
                    >
                        <Popup>
                            hello  world
                        </Popup>
                    </Marker>
                    :
                    null
            }

            <GetCLicickedCordinates
                setPos={data => {
                    setClickedPos(data)
                    if (onClick) onClick(data)
                    // if(setAddress) {
                    //     getAddress({
                    //         lat: data.lat.toString(),
                    //         lng: data.lng.toString()
                    //     })
                    //     .then(data => {
                    //         setAddress(data.data.address.neighbourhood + " " + data.data.address.road)
                    //     })
                    // }
                }}
            />

        </MapContainer>
    )
}

export default GetAnAddressFromGoogleMap