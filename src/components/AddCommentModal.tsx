
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useToast,
} from "@chakra-ui/react";
import { ReactNode, useRef, useState } from "react";
import { addComment, addCommentOutPut } from "../utils/http/api/addComment";
import { Rate } from "antd";


interface AddCommentModalProps {
    title: string;
    showCloseIcon?: boolean;
    children: ReactNode;
    job_id: number;
    onSuccess?(data: addCommentOutPut): void
    onError?(error: Error): void
}

function AddCommentModal({ children, title, showCloseIcon = true, job_id, onError=undefined, onSuccess=undefined }: AddCommentModalProps) {

    const { isOpen, onClose, onOpen } = useDisclosure();
    const [rate, setRate] = useState<number>(undefined);
    const commentRef = useRef<HTMLTextAreaElement>(undefined)
    const toast = useToast()

    const onSubmit = () => {
        if (!(rate > 0)) {
            toast({
                description: "ستاره را انتخاب کنید",
                duration: 4000,
                isClosable: true,
                status: "warning",
                position: "top-right"
            })
        }
        else {
            addComment({
                content: commentRef.current.value,
                job_id: job_id,
                rate: rate.toString()
            })
                .then(data => {
                    onClose()
                    if(onSuccess) onSuccess(data)
                    setRate(0)
                })
                .catch(err => {
                    onClose()
                    if(onError) onError(err)
                    setRate(0)
                })
        }
    }

    return (
        <>
            <div onClick={onOpen}>
                {children}
            </div>
            <Modal size="sm" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="medium"
                        className="font-[vazir]"
                    >
                        {title}
                    </ModalHeader>
                    {
                        showCloseIcon
                            ? <ModalCloseButton left="8px" right="unset" />
                            : false
                    }
                    <ModalBody pb="22px">

                        <div className="w-full grid place-items-center mb-4" dir="ltr">
                            <Rate
                                value={rate}
                                count={5}
                                onChange={(value) => setRate(value)}
                            />
                        </div>



                        <textarea
                            maxLength={500}
                            rows={4}
                            ref={commentRef}
                            className="primary-text-input placeholder-slate-400 text-slate-600 font-[vazir]"
                            placeholder="لطفا نظر خود را وارد کنید"
                        >
                        </textarea>

                        <div className="w-full flex items-center gap-x-3 mt-6">
                            <button onClick={onSubmit} className="primary-btn py-2">
                                درج نظر
                            </button>

                            <button onClick={onClose} className="primary-btn py-2 bg-transparent text-blue-500 border border-blue-500">
                                صرف نظر
                            </button>
                        </div>

                    </ModalBody>
                </ModalContent>
            </Modal>

        </>
    )
}

export default AddCommentModal