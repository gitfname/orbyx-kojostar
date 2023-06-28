
import { useDisclosure } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody
} from "@chakra-ui/react"
import { ReactNode } from "react";


interface Modal_2Props {
    children: ReactNode
    title: string
    showCloseIcon?: boolean,
    modalBody?: ReactNode
}

function Modal_2({children, showCloseIcon=true, title, modalBody}: Modal_2Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

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
                        className="font-[iranyekan400]"
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