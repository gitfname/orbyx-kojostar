
import { useEffect, useRef } from "react"
import middleware from "./middleware"
import { addOffer } from "../../utils/http"
import { useToast } from "@chakra-ui/react"
import { useApplicationLoadingStore } from "../../stores/useApplicationLoadingStore"

function CommentsAndSuggestion() {

    const contentRef = useRef<HTMLTextAreaElement>(undefined)
    const phoneRef = useRef<HTMLInputElement>(undefined)
    const toast = useToast()
    const setIsApplicationLoading = useApplicationLoadingStore(selector => selector.setIsLoading)

    useEffect(
        () => {
            middleware()
        },
        []
    )

    const handleSubmit = () => {
        setIsApplicationLoading(true)
        addOffer({
            content: contentRef.current.value,
            extra: phoneRef.current.value
        })
            .then(res => {
                toast({
                    description: res.message,
                    position: "top-right",
                    isClosable: false,
                    duration: 3000,
                    status: "success"
                })
                setIsApplicationLoading(false)
            })
            .catch(() => {
                toast({
                    description: "مشکلی رخ داد. لطفا بعدا دوباره امتحان کنید",
                    position: "top-right",
                    isClosable: false,
                    duration: 3000,
                    status: "error"
                })
                setIsApplicationLoading(false)
            })
    }

    return (
        <div className="w-full max-lg:h-full h-screen overflow-y-auto">
            <div className="w-full h-min py-8 px-4">

                <p
                    className="text-lg text-slate-800 font-[vazirMedium]"
                >
                    نظرات و پیشنهادات
                </p>

                <textarea
                    ref={contentRef}
                    rows={8}
                    className="primary-text-input mt-14"
                    placeholder="اطلاعاتی درمورد مکان مورد نظر خود به ما بدهید"
                >
                </textarea>

                <p className="text-slate-900 text-xs font-[vazirMedium] mt-8">
                    درصور تمایل میتوانید شماره تماس خودرا وارد کنید
                </p>
                <input
                    ref={phoneRef}
                    type="text"
                    maxLength={11}
                    className="primary-text-input mt-4"
                    placeholder="تلفن"
                />

                <button onClick={handleSubmit} className="primary-btn mt-12 max-w-xs mx-auto block">
                    ثبت
                </button>

            </div>
        </div>
    )
}

export default CommentsAndSuggestion