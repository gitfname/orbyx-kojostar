
import {
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton
} from "@chakra-ui/react"


function InfoModal_1({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <div onClick={onOpen}>
                {children}
            </div>

            <Modal size={["sm", "lg"]} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>

                    <ModalCloseButton left="8px" right="unset" />
                    <ModalBody pb="12px">
                        <p
                            className="text-sm text-slate-800 font-[vazirMedium] mt-8 leading-6"
                        >
                            کاربر گرامی,<br />
                            با نشان دادن اپلیکیشن کوجو برروی گوشی خود در هنگام خرید, می توانید از درصد تخفیف ذکر شده برای هریک از مشاغل این قسمت استفاده کنید.
                            <br />
                            همچنین درصورت مشاهده تخلف فروشنده, میتوانید از قسمت "گزارش ناهمخوانی اطلاعات" در صفحه همان کسب و کار, موارد را اطلاع دهید.
                        </p>
                        <button onClick={onClose} className="primary-btn block w-max mx-auto mt-7">
                            متوجه شدم
                        </button>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

export default InfoModal_1