
import { Mark } from "@chakra-ui/react";
import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, useMapEvents } from "react-leaflet"

interface Props {
    latlng: Array<{
        latlng: LatLng;
        title: string;
    }>;
    zoom: number;
    width?: string;
    height?: string;
    markable?: boolean;
    onChange?(latlng: LatLng): void
}

interface ClickedPositionProps {
    onChange?(latlng: LatLng): void
} 

function ClickedPosition({ onChange }: ClickedPositionProps) {
    const [pos, setPos] = useState<LatLng>(undefined)

    useEffect(
        () => {
            if(pos) {
                onChange(pos)
            }
        },
        [pos]
    )

    useMapEvents({
        click: (e => {
            setPos(e.latlng)
        })
    })

    return <>
        {
            pos
                ?
                <Marker title="موقعیت جدید" position={[pos.lat, pos.lng]}></Marker>
                :
                null
        }
    </>
}

function MarkPlaceOnMap({ latlng, zoom, height = undefined, width = undefined, markable = false, onChange = undefined }: Props) {

    const [pos, setPos] = useState<LatLng>(undefined)

    useEffect(
        () => {
            if(pos && onChange) {
                onChange(pos)
            }
        },
        [pos]
    )

    return (
        <MapContainer
            center={[latlng[0].latlng.lat, latlng[0].latlng.lng]}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{
                width: width ? width : "100%",
                height: height ? height : "400px",
                borderRadius: "12px"
            }}
            className='shadow-md shadow-black/10 z-10'
        >

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
                latlng?.map(latlng => (
                    <Marker position={[latlng.latlng.lat, latlng.latlng.lng]}>
                        <Popup>
                            {latlng.title}
                        </Popup>
                    </Marker>
                ))
            }

            {
                markable
                    ?
                    <ClickedPosition onChange={(pos) => setPos(pos)} />
                    : null
            }


        </MapContainer>
    )
}

export default MarkPlaceOnMap