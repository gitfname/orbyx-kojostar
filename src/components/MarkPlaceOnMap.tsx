
import { LatLng } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

interface Props {
    latlng: Array<{
        latlng: LatLng;
        title: string;
    }>;
    zoom: number;
    width?: string;
    height?: string;
}

function MarkPlaceOnMap({ latlng, zoom, height=undefined, width=undefined }: Props) {
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
            className='shadow-md shadow-black/10'
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


        </MapContainer>
    )
}

export default MarkPlaceOnMap