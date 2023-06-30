
import { useDisclosure } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody
} from "@chakra-ui/react"
import { ReactNode, useEffect } from "react";


interface Modal_2Props {
    children: ReactNode;
    title: string;
    showCloseIcon?: boolean;
    modalBody?: ReactNode;
    close?(close: Function): void
}

function Modal_2({children, showCloseIcon=true, title, modalBody, close}: Modal_2Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(
        () => {
            close&&close(onClose)
        },
        []
    )

    return (
        <>
            <div onClick={onOpen}>
                {children}
            </div>
            <Modal size="lg" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="medium"
                        className="font-[vazirLight]"
                    >
                        {title}
                    </ModalHeader>
                    {
                        showCloseIcon
                            ? <ModalCloseButton left="8px" right="unset" />
                            : false
                    }
                    <ModalBody pb="12px">

                        {modalBody}

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Modal_2