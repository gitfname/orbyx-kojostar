
import { LatLng } from "leaflet"
import MarkPlaceOnMap from "../components/MarkPlaceOnMap"
import { useDisclosure, Modal, ModalCloseButton, ModalBody, ModalOverlay, ModalContent } from "@chakra-ui/react"
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

    const { isOpen, onOpen, onClose } = useDisclosure()
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
            {/* <Modal isOpen={isOpen} onClose={onClose} size="5xl">
                <ModalOverlay />

                <ModalContent>

                    <ModalBody>

                        <div className="mt-12 pb-3">
                            <MarkPlaceOnMap
                                zoom={10}
                                latlng={latlng}
                            />
                        </div>


                    </ModalBody>

                    <ModalCloseButton left="8px" right="unset" />

                </ModalContent>

            </Modal> */}
        </>
    )
}

export default ShowJobsInMap