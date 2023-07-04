
import { LatLng } from "leaflet"
import MarkPlaceOnMap from "../components/MarkPlaceOnMap"
import { ReactNode } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen"

interface Props {
    latlng: Array<{
        latlng: LatLng;
        title: string;
    }>;
    children: ReactNode;
}

function ShowJobsInMap({ children, latlng }: Props) {
    const handle = useFullScreenHandle()

    return (
        <>
            <div onClick={handle.enter}>
                {children}
            </div>
            <FullScreen handle={handle}>
                <div className={`w-full h-full p-3.5 ${handle.active ? "z-10" : "-z-50 hidden"}`}>
                    <MarkPlaceOnMap
                        zoom={6}
                        height="100%"
                        latlng={latlng}
                    />
                </div>
            </FullScreen>
        </>
    )
}

export default ShowJobsInMap